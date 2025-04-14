import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Golf Assistant - Find the Perfect Tee Time",
  description: "Tell us when you want to play, we'll tell you where, when, and why.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'