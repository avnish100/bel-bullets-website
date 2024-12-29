// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Profile } from '@/app/types/database.types'
// import { createClient } from '@/utils/supabase/client'

// export default function StravaAuth() {
//   const [profile, setProfile] = useState<Profile | null>(null)
//   const supabase = createClient();
//   const router = useRouter()

//   useEffect(() => {
//     const getProfile = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) return

//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', user.id)
//         .single()

//       if (error) {
//         console.error('Error fetching profile:', error)
//         return
//       }

//       setProfile(data)
//     }

//     getProfile()
//   }, [supabase])

//   const handleStravaConnect = () => {
//     const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
//     const redirectUri = `${window.location.origin}/auth/strava/callback`
//     const scope = 'read,activity:read'

//     window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`
//   }

//   if (!profile) return null

//   return (
//     <div>
//       {!profile.strava_access_token ? (
//         <button
//           onClick={handleStravaConnect}
//           className="bg-orange-500 text-white px-4 py-2 rounded"
//         >
//           Connect with Strava
//         </button>
//       ) : (
//         <div className="text-green-600">✓ Connected to Strava</div>
//       )}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Profile } from '@/app/types/database.types'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Button } from './ui/button'

export default function StravaAuth() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()
  

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true)
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) throw userError
        if (!user) {
          router.push('/login')
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
        console.error('Error fetching profile:', err)
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [supabase, router])

  const handleStravaConnect = async () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
    if (!clientId) {
      setError('Strava client ID not configured')
      return
    }

    const redirectUri = `${window.location.origin}/auth/strava/callback`
    const scope = 'read,activity:read'
    const state = crypto.randomUUID() // Add CSRF protection

    // Set state in an HTTP-only cookie
    const response = await fetch('/auth/strava/set-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    })
    console.log(response);
    if (!response.ok) {
      setError('Failed to initialize Strava connection')
      return
    }

    const authUrl = new URL('https://www.strava.com/oauth/authorize')
    authUrl.searchParams.append('client_id', clientId)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('redirect_uri', redirectUri)
    authUrl.searchParams.append('scope', scope)
    authUrl.searchParams.append('state', state)

    window.location.href = authUrl.toString()
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!profile) return null

  return (
    <div className="flex flex-col gap-4">
      {!profile.strava_access_token ? (
        <Button
          onClick={handleStravaConnect}
          variant='default'
        >
          <Image
            src="/strava-icon.svg"
            alt="Strava"
            width={30}
            height={30}
          />
          Connect with Strava
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Connected to Strava
        </div>
      )}
    </div>
  )
}