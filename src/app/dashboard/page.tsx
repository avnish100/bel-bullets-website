'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import StravaAuth from '@/components/StravaAuth'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  strava_access_token: string | null
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) throw profileError

          setProfile(profile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Run Club</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">
                {profile?.first_name} {profile?.last_name}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className=" shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome, {profile?.first_name}!</h2>
            <p className="text-gray-600">
              {!profile?.strava_access_token
                ? "Connect your Strava account to sync your running activities."
                : "Your Strava account is connected. Your activities will sync automatically."}
            </p>
          </div>

          
            <StravaAuth />


          {profile?.strava_access_token && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
              {/* Add component to display Strava activities */}
              <p className="text-gray-600">
                Your Strava activities will appear here once they sync.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
