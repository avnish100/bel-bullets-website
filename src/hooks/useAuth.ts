import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { getStravaAuthUrl } from '@/utils/stravaAuth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const registerWithStrava = async (email: string, password: string, name: string) => {
    const state = JSON.stringify({ email, password, name })
    const authUrl = await getStravaAuthUrl(encodeURIComponent(state))
    window.location.href = authUrl
  }

  return { user, loading, signIn, signOut, registerWithStrava }
}

