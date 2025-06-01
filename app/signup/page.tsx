'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Step 1: Create user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError) return setError(signUpError.message)

    // Step 2: Insert into profiles table
    const userId = data.user?.id
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: userId, username })

      if (profileError) return setError(profileError.message)

      router.push('/app')
    }
  }

  return (
    <form onSubmit={handleSignup} className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Create an Account</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Sign Up
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-sm mt-4 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 underline">
          Log in
        </a>
      </p>
    </form>
  )
}