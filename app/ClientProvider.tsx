'use client'

import BottomNav from '../components/BottomNav'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-20 relative">
      {children}
      <BottomNav />
    </div>
  )
}