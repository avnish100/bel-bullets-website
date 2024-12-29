import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  // Validate required parameters
  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
  }

  // Validate state parameter (CSRF protection)
  const cookieStore = await cookies()
  const expectedState = cookieStore.get('strava_auth_state')?.value

  if (!state || state !== expectedState) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 })
  }

  // Clean up state cookie
  const response = NextResponse.next()
  response.cookies.delete('strava_auth_state')

  try {
    // Initialize server-side Supabase client
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Authentication error:', userError)
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      throw new Error(`Strava token exchange failed: ${error}`)
    }

    const data = await tokenResponse.json()

    // Update profile with Strava tokens
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        strava_access_token: data.access_token,
        strava_refresh_token: data.refresh_token,
        strava_token_expires_at: data.expires_at,
        strava_athlete_id: data.athlete?.id
      })
      .eq('id', user.id)

    if (updateError) {
      throw new Error(`Profile update failed: ${updateError.message}`)
    }

    return NextResponse.redirect(new URL('/dashboard', req.url))
  } catch (error) {
    console.error('Strava callback error:', error)
    
    // Redirect to error page with message
    const errorUrl = new URL('/error', req.url)
    errorUrl.searchParams.append('message', 'Failed to connect Strava account')
    return NextResponse.redirect(errorUrl)
  }
}