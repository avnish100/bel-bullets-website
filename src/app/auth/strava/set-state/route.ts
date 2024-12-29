import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { state } = await req.json()
    
    const response = NextResponse.json({ success: true })
    
    // Set the state in an HTTP-only cookie
    response.cookies.set('strava_auth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5, // 5 minutes
    })
    
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set state' }, { status: 500 })
  }
}