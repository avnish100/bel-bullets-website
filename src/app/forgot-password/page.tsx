'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from '@/utils/supabase/client'
import { Alert, AlertDescription } from "@/components/ui/alert"

// Create a separate component for the form content
function PasswordResetForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for recovery token in URL
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      // Get the error description from URL if it exists
      const errorDescription = searchParams.get('error_description')
      if (errorDescription) {
        setMessage({
          type: 'error',
          text: decodeURIComponent(errorDescription)
        })
        return
      }

      // Check if we're in a recovery flow
      if (session?.user?.email) {
        setIsPasswordReset(true)
      }
    }

    checkSession()
  }, [searchParams, supabase.auth])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forgot-password?reset=true`
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'If an account exists with this email, you will receive a password reset link'
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send reset email. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match'
      })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters'
      })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Password updated successfully. Redirecting to login...'
      })
      
      // Sign out the user after password update
      await supabase.auth.signOut()
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update password. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isPasswordReset ? 'Update Password' : 'Forgot Password'}</CardTitle>
        <CardDescription>
          {isPasswordReset ? 'Enter your new password' : 'Enter your email to reset your password'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={isPasswordReset ? handleUpdatePassword : handlePasswordReset} className="space-y-4">
          {isPasswordReset ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  minLength={6}
                  disabled={loading}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : isPasswordReset ? 'Update Password' : 'Send Reset Link'}
          </Button>
        </form>
        {message && (
          <Alert className={`mt-4 ${message.type === 'error' ? 'bg-destructive/15' : 'bg-primary/15'}`}>
            <AlertDescription>
              {message.text}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

// Main component with proper Suspense boundary
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordResetForm />
      </Suspense>
    </div>
  )
}