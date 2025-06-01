'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const handleDiscordLogin = async () => {

  await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      setError(loginError.message)
    } else {
      router.push('/app')
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Log In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        <span>Remember me</span>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Log In
      </button>
      <button
  type="button"
  onClick={handleDiscordLogin}
  className="w-full bg-purple-600 text-white p-2 rounded"
>
  Log In with Discord
</button>
<p className="text-sm mt-4 text-center">
  Don't have an account?{' '}
  <a href="/signup" className="text-blue-600 underline">
    Sign up
  </a>
</p>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

function createSupabaseClient(remember: boolean) {
  throw new Error('Function not implemented.')
}
