'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TestPage() {
  useEffect(() => {
    const check = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      console.log('Session:', sessionData)
      if (error) console.error('Session error:', error)

      const { data: userData } = await supabase.auth.getUser()
      console.log('User:', userData)
    }

    check()
  }, [])

  return <p className="p-6">Check console for Supabase auth</p>
}