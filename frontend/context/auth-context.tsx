"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  name?: string
  email?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (data: { idToken: string; refreshToken: string; expiresIn: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("idToken")
      const expiry = Number.parseInt(localStorage.getItem("expiresAt") || "0")
      const userName = localStorage.getItem("userName")

      if (token && Date.now() < expiry) {
        setIsAuthenticated(true)
        setUser({ name: userName || undefined })
      } else {
        // Clear expired tokens
        if (token) {
          localStorage.removeItem("idToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("expiresAt")
          localStorage.removeItem("userName")
        }
        setIsAuthenticated(false)
        setUser(null)
      }
    }
  }, [])

  const login = ({
    idToken,
    refreshToken,
    expiresIn,
  }: { idToken: string; refreshToken: string; expiresIn: string }) => {
    const expiresAt = Date.now() + Number.parseInt(expiresIn) * 1000

    localStorage.setItem("idToken", idToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("expiresAt", expiresAt.toString())

    // Update user state with name from localStorage
    const userName = localStorage.getItem("userName")
    if (userName) {
      setUser({ name: userName })
    }

    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("idToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("expiresAt")
    localStorage.removeItem("userName")

    setIsAuthenticated(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
