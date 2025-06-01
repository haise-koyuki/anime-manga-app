'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session) {
        router.push('/app')
      } else {
        router.push('/login')
      }
    })
  }, [router])

  return <p className="p-6">Finishing login…</p>
}