import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { exchangeStravaCode } from '@/utils/stravaAuth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error('Strava auth error:', error)
    return NextResponse.redirect('/register?error=strava_auth_failed')
  }

  if (!code || !state) {
    return NextResponse.redirect('/register?error=invalid_callback')
  }

  try {
    // Parse the state parameter which contains user registration data
    const { email, password, name } = JSON.parse(decodeURIComponent(state))
    
    // Exchange the authorization code for Strava tokens
    const stravaTokens = await exchangeStravaCode(code)
    
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Create the user account in Supabase
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          strava_id: stravaTokens.athlete.id
        }
      }
    })

    if (signUpError || !authData.user) {
      console.error('Error creating user:', signUpError)
      return NextResponse.redirect('/register?error=signup_failed')
    }

    // Store Strava tokens in the database
    const { error: stravaTokenError } = await supabase
      .from('user_strava_info')
      .insert({
        id: authData.user.id,
        strava_id: stravaTokens.athlete.id,
        access_token: stravaTokens.access_token,
        refresh_token: stravaTokens.refresh_token,
        token_expires_at: stravaTokens.expires_at,
      })

    if (stravaTokenError) {
      console.error('Error storing Strava tokens:', stravaTokenError)
      return NextResponse.redirect('/register?error=strava_token_storage_failed')
    }

    // Store club member info
    const { error: clubMemberError } = await supabase
      .from('club_members')
      .insert({
        id: authData.user.id,
        email,
        name,
        strava_id: stravaTokens.athlete.id
      })

    if (clubMemberError) {
      console.error('Error storing club member info:', clubMemberError)
      return NextResponse.redirect('/register?error=club_member_creation_failed')
    }

    // Sign in the user
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return NextResponse.redirect('/login?error=signin_failed')
    }

    // Redirect to dashboard on success
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Error in Strava callback:', error)
    return NextResponse.redirect('/register?error=registration_failed')
  }
}

