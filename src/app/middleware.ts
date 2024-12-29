// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import supabase from '@supabase/ssr'

// export async function middleware(req: NextRequest) {
// //   const res = NextResponse.next()
// //   const supabase = createMiddlewareClient({ req, res })
// //   const response = await updateSession(req)
// //   try {
// //     const {
// //       data: { session },
// //       error: sessionError,
// //     } = await supabase.auth.getSession()

// //     if (sessionError) {
// //       console.error('Session Error:', sessionError)
// //       return NextResponse.redirect(new URL('/login', req.url))
// //     }

// //     // 🚨 Protected Routes
// //     if (req.nextUrl.pathname.startsWith('/dashboard')) {
// //       if (!session) {
// //         return NextResponse.redirect(new URL('/login', req.url))
// //       }

// //       // 🔄 Check Strava Token
// //       const { data: profile, error: profileError } = await supabase
// //         .from('profiles')
// //         .select('strava_access_token')
// //         .eq('id', session.user.id)
// //         .single()

// //       if (profileError) {
// //         console.error('Profile Error:', profileError)
// //         return NextResponse.redirect(new URL('/login', req.url))
// //       }

// //       if (profile?.strava_access_token) {
// //         // Add header to notify client to refresh token
// //         res.headers.set('x-check-strava-token', 'true')
// //       }
// //     }

// //     // 🚨 Redirect Logged-in Users Away from Auth Pages
// //     if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
// //       return NextResponse.redirect(new URL('/dashboard', req.url))
// //     }
// //   } catch (error) {
// //     console.error('Middleware Error:', error)
// //     return NextResponse.redirect(new URL('/login', req.url))
// //   }

// //   return res


// const response = await updateSession(req)

// // Check if the user is logged in via Supabase session

// return response
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/login', '/signup'],
// }

import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow Strava callback to proceed without auth check
  if (pathname.startsWith('/api/auth/strava/callback')) {
    return NextResponse.next()
  }

  // Update the session for all other routes
  const response = await updateSession(request)

  // Get current session from cookie
  const authCookie = request.cookies.get('supabase-auth-token')
  const isAuthenticated = !!authCookie?.value

  // Protect dashboard routes
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/api/auth/strava/callback'
  ]
}