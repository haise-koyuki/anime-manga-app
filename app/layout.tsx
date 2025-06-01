'use client'

import './globals.css'
import { Toaster } from 'react-hot-toast'

import ClientProvider from './ClientProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Toaster />
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}