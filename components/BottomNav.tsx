'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BottomNav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  console.log('BottomNav rendered')

  return (
    <>
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center justify-around shadow-inner z-50">
        <Link href="/" className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" /></svg>
          <span className="text-xs">Home</span>
        </Link>

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle Search"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <span className="text-xs">Search</span>
        </button>

        <Link href="/library" className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 19h16M4 15h16M4 11h16M4 7h16" /></svg>
          <span className="text-xs">Library</span>
        </Link>
      </footer>

      {searchOpen && (
        <div className="pb-16 left-0 right-0 bg-white border-t p-3 shadow-md z-50">
          <input
            type="text"
            placeholder="Search anime or manga..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
        </div>
      )}
    </>
  )
}