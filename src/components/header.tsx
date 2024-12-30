'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  style: 'normal',
  weight: '400',
  subsets: ["latin"]
})


const supabase = createClient()
const AUTH_TIMEOUT_MS = 5000

export function Header() {
  const [userId, setUserId] = useState<string | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const checkSession = async () => {
    try {
      setIsLoading(true)
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Auth check timed out')), AUTH_TIMEOUT_MS)
      })

      const sessionPromise = supabase.auth.getSession()

      const { data: { session }, error } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]) as { data: { session: any }, error: any }
      
      if (error) {
        console.error('Error fetching session:', error)
        return
      }

      setUserId(session?.user?.id ?? null)
    } catch (error) {
      console.error('Unexpected error:', error)
      setUserId(null) // Reset to not logged in state on timeout/error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [pathname])

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, 'User:', session?.user?.id)
      
      if (event === 'SIGNED_IN') {
        setUserId(session?.user?.id)
        await checkSession()
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        setUserId(null)
        router.refresh()
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])

  const renderAuthButton = () => {
    if (isLoading) {
      return <span className="text-white">Loading...</span>
    }

    if (userId) {
      return (
        <form action="/auth/signout" method="post">
          <Button
            variant="destructive"
            type="submit"
            className="text-white hover:text-white/80"
          >
            Log out
          </Button>
        </form>
      )
    }

    return (
      <Button variant="ghost" asChild className="text-white hover:text-white/80">
        <Link href="/login">Log in</Link>
      </Button>
    )
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md mb-10">
      <div className="container mx-auto px-4 py-4 -mt-7 -mb-7">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <Image
              alt="Bel Bullets logo"
              src="/bel-bullets-logo.png"
              className="content-center"
              width={100}
              height={50}
            />
            <div className={`content-center ml-2 ${merriweather.className}`}>BEL BULLETS</div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link href="/leaderboard" className="text-white hover:text-white/80">
              Leaderboard
            </Link>

            {/* Auth Button */}
            {renderAuthButton()}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4">
                  <Link href="/about" className="text-lg">
                    About
                  </Link>
                  <Link href="/events" className="text-lg">
                    Events
                  </Link>
                  <Link href="/community" className="text-lg">
                    Community
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}