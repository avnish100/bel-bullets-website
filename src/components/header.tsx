'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Merriweather } from 'next/font/google'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
const AUTH_TIMEOUT_MS = 1000

const merriweather = Merriweather({
  style: 'normal',
  weight: '400',
  subsets: ["latin"]
})

export function Header() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
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
        setUserId(null)
        return
      }

      setUserId(session?.user?.id ?? null)
    } catch (error) {
      console.error('Unexpected error:', error)
      setUserId(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Check session on mount and route changes
  useEffect(() => {
    checkSession()
  }, [pathname])

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user.id) {
        setUserId(session?.user?.id)
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        setUserId(null)
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const AuthButton = () => {
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
      <Button variant="secondary" asChild className="text-white hover:text-white/80">
        <Link href="/login">Log in</Link>
      </Button>
    )
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link href="/leaderboard" className="text-white hover:text-white/80" onClick={onClick}>
        Leaderboard
      </Link>
      <Link href="/about" className="text-white hover:text-white/80" onClick={onClick}>
        About
      </Link>
      <Link href="/events" className="text-white hover:text-white/80" onClick={onClick}>
        Events
      </Link>
      <Link href="/community" className="text-white hover:text-white/80" onClick={onClick}>
        Community
      </Link>
    </>
  )

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 md:py-4 mt-[-30px] mb-[-30px]">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              alt="Bel Bullets logo"
              src="/bel-bullets-logo.png"
              width={100}
              height={50}
              priority
            />
            <div className={`ml-2 text-lg md:text-2xl text-white ${merriweather.className}`}>
              BEL BULLETS
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <AuthButton />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <AuthButton />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetTitle className="text-lg mb-4">Menu</SheetTitle>
                <nav className="flex flex-col space-y-4">
                  <NavLinks onClick={() => setIsSheetOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

