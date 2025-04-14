"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, Apple, Facebook, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")
  const [userName, setUserName] = useState("")

  // Form states
  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  // Error states
  const [signinError, setSigninError] = useState("")
  const [signupError, setSignupError] = useState("")

  // Auth context
  const { login, logout, isAuthenticated } = useAuth()

  // Get user info from localStorage on mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSigninError("")

    if (!signinEmail || !signinPassword) {
      setSigninError("Please fill in all fields")
      return
    }

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signinEmail,
          password: signinPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setSigninError(errorData.message || "Invalid email or password")
        return
      }

      const data = await response.json()
      console.log("User signed in:", data)

      // Store user name for display
      if (data.user && data.user.name) {
        localStorage.setItem("userName", data.user.name)
        setUserName(data.user.name)
      }

      // Store a token, user info, etc., here
      login({
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      })

      alert("Sign in successful!")
      onClose()
    } catch (error: any) {
      console.error("Sign-in error:", error)
      setSigninError("An unexpected error occurred. Please try again.")
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")

    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError("Please fill in all fields")
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match")
      return
    }

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setSignupError(errorData.message || "An error occurred during sign up")
        return
      }

      const data = await response.json()
      console.log("User signed up:", data)

      // Store user name for display
      localStorage.setItem("userName", signupName)
      setUserName(signupName)

      // Store a token, user info, etc., here
      login({
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      })

      alert("Sign up successful!")
      onClose()
    } catch (error: any) {
      console.error("Sign-up error:", error)
      setSignupError("An unexpected error occurred. Please try again.")
    }
  }

  const handleSignOut = async () => {
    try {
      // Get the token to include in the request
      const token = localStorage.getItem("idToken")

      // Clear user info
      localStorage.removeItem("userName")
      setUserName("")

      // Perform any necessary cleanup in the context
      logout()

      alert("Signed out successfully!")
      onClose()
    } catch (error: any) {
      console.error("Sign-out error:", error)
      alert("An unexpected error occurred while signing out. Please try again.")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl border-0 bg-white/80 p-0 shadow-2xl backdrop-blur-xl sm:max-w-[450px]">
        {isAuthenticated ? (
          <div className="p-6">
            <DialogHeader className="mb-6 text-center">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Welcome, {userName || "Golfer"}
              </DialogTitle>
              <DialogDescription className="text-gray-500">You are signed in</DialogDescription>
            </DialogHeader>

            <div className="mb-6 overflow-hidden rounded-2xl bg-masters-green/10 p-4">
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-masters-green/20">
                  <User className="h-8 w-8 text-masters-green" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-medium text-gray-900">{userName || "Golfer"}</p>
                <p className="text-sm text-gray-500">Signed in successfully</p>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                className="w-full rounded-full bg-masters-green py-6 text-white shadow-md hover:bg-masters-green/90"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        ) : (
          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-t-3xl bg-gray-50/80 p-1 backdrop-blur-sm">
              <TabsTrigger
                value="signin"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-masters-green data-[state=active]:shadow-sm"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-masters-green data-[state=active]:shadow-sm"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="p-6">
              <form onSubmit={handleSignIn}>
                <DialogHeader className="mb-6 text-center">
                  <DialogTitle className="text-2xl font-semibold text-gray-900">Welcome Back</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Sign in to access your Golf Assistant account
                  </DialogDescription>
                </DialogHeader>

                <div className="mb-6 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full border border-gray-200 bg-white py-5 shadow-sm hover:bg-gray-50"
                  >
                    <Apple className="mr-2 h-5 w-5" />
                    Sign in with Apple
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full border border-gray-200 bg-white py-5 shadow-sm hover:bg-gray-50"
                  >
                    <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                    Sign in with Facebook
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">or continue with email</span>
                  </div>
                </div>

                <div className="grid gap-5 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signinEmail}
                        onChange={(e) => setSigninEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <button type="button" className="text-xs text-masters-green hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 pr-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signinPassword}
                        onChange={(e) => setSigninPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 rounded-full text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {signinError && <p className="text-sm text-masters-red">{signinError}</p>}
                </div>

                <motion.div className="mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-masters-green py-6 text-white shadow-md hover:bg-masters-green/90"
                  >
                    Sign In
                  </Button>
                </motion.div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <button
                    type="button"
                    className="text-masters-green hover:underline"
                    onClick={() => setActiveTab("signup")}
                  >
                    Don't have an account? Sign up
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              <form onSubmit={handleSignUp}>
                <DialogHeader className="mb-6 text-center">
                  <DialogTitle className="text-2xl font-semibold text-gray-900">Create Account</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Join Golf Assistant to book tee times and track your golf journey
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 pr-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 rounded-full text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-confirm-password" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        className="rounded-full border-gray-200 bg-gray-50/50 pl-10 shadow-sm focus:border-masters-green focus:ring-masters-green"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {signupError && <p className="text-sm text-masters-red">{signupError}</p>}
                </div>

                <motion.div className="mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-masters-green py-6 text-white shadow-md hover:bg-masters-green/90"
                  >
                    Create Account
                  </Button>
                </motion.div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <button
                    type="button"
                    className="text-masters-green hover:underline"
                    onClick={() => setActiveTab("signin")}
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
