'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    for (var [key, value] of formData.entries()) { 
        console.log("Formdata")
        console.log(key, value);
    }
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    
  
    const { data: signUpData, error } = await supabase.auth.signUp(data)
  
    if (error) {
        console.log(error)
      redirect('/error')
    }

    const user = signUpData?.user

    if (!user || !user.id) {
        throw new Error('Failed to retrieve user ID after signup')
      }

  // Step 2: Insert user details into the profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert([
      {
        id: user.id, // Ensure it matches the auth user ID
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
      },
    ]) // Prevent duplicate entries

  if (profileError) {
    console.error('Profile Error:', profileError)
    throw new Error('Failed to create user profile')
  }

    // 
  
    revalidatePath('/', 'layout')
    // TODO : generalize this
    redirect('/leaderboard2')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  
  if (error) {
    console.error('Sign in error:', error)
    redirect('/error')
  }

  // Wait for session to be established
  await new Promise(resolve => setTimeout(resolve, 500))

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !sessionData?.session) {
      console.error('Session not available after login:', sessionError?.message)
      redirect('/error')
  }

  // Ensure session is propagated
  console.log('✅ Session confirmed:', sessionData.session.user.id)
  
  // Revalidate paths
  // TODO : generalize this
  revalidatePath('/', 'layout')
  revalidatePath('/leaderboard2')
  
  // Redirect to loading page
  redirect('/auth/loading')
}