"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/search-form"
import { AuthModal } from "@/components/auth-modal"
import { motion } from "framer-motion"
import { ChevronDown, Sun, Cloud, MapPin, Calendar, Clock, Star, LogIn, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const { isAuthenticated, logout, user } = useAuth()

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Open the auth modal to show the sign out option
      setIsAuthModalOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  // Sample featured courses data
  const featuredCourses = [
    {
      id: 1,
      name: "Augusta National",
      location: "Augusta, GA",
      image: "/placeholder.svg?height=300&width=500&text=Augusta",
      rating: 4.9,
      distance: "8 miles",
      weather: { condition: "Sunny", temp: "72°" },
      price: "$150+",
    },
    {
      id: 2,
      name: "Pebble Beach",
      location: "Pebble Beach, CA",
      image: "/placeholder.svg?height=300&width=500&text=Pebble Beach",
      rating: 4.8,
      distance: "12 miles",
      weather: { condition: "Partly Cloudy", temp: "68°" },
      price: "$175+",
    },
    {
      id: 3,
      name: "St Andrews",
      location: "St Andrews, Scotland",
      image: "/placeholder.svg?height=300&width=500&text=St Andrews",
      rating: 4.9,
      distance: "15 miles",
      weather: { condition: "Cloudy", temp: "62°" },
      price: "$125+",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7] font-sans">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <span className="text-xl">⛳</span>
            <span className={scrolled ? "text-masters-green" : "text-white"}>ProShop</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/favorites"
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-gray-600 hover:text-masters-green" : "text-white/80 hover:text-white"
              }`}
            >
              Favorites
            </Link>
            <Link
              href="/history"
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-gray-600 hover:text-masters-green" : "text-white/80 hover:text-white"
              }`}
            >
              History
            </Link>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full px-4 transition-colors ${
                scrolled
                  ? "border-masters-green text-masters-green hover:bg-masters-green hover:text-white"
                  : "border-white text-masters-green hover:bg-masters-green hover:text-white"
              }`}
              onClick={handleAuthClick}
            >
              {isAuthenticated ? (
                <>
                  <User className="mr-2 h-4 w-4" />
                  {user?.name || "Account"}
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image src="/golf-background.jpg" alt="Golf course" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 pb-24">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Perfect <span className="text-masters-yellow">Tee Time</span>
            </h1>
            <p className="mb-10 text-lg text-white/90 md:text-xl">
              Tell us when you want to play, we'll tell you where, when, and why.
            </p>

            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white/20 p-0.5 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-[23px] bg-white/90 p-8 backdrop-blur-sm">
                <SearchForm />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button
              className="flex flex-col items-center text-white/80 transition-colors hover:text-white"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              <span className="mb-2 text-sm">Explore Courses</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Weather Widget Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Today's Golf Weather</h2>
            <p className="mt-2 text-gray-500">Perfect conditions for your next round</p>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Weather Widget */}
            <motion.div
              className="overflow-hidden rounded-3xl bg-white/20 p-0.5 shadow-lg backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-[23px] bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md">
                <div className="grid gap-4 p-6 md:grid-cols-4">
                  <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-masters-green/10 p-4 text-center">
                    <Sun className="mb-2 h-10 w-10 text-masters-yellow" />
                    <div className="text-3xl font-semibold text-gray-900">72°</div>
                    <div className="text-sm text-gray-500">Sunny</div>
                    <div className="mt-2 text-xs text-gray-400">
                      {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  <div className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      { day: "Tomorrow", temp: "68°", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
                      { day: "Saturday", temp: "70°", icon: <Sun className="h-6 w-6 text-masters-yellow" /> },
                      { day: "Sunday", temp: "65°", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
                    ].map((day, i) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between rounded-2xl bg-white/50 p-4 backdrop-blur-sm"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-500">{day.day}</div>
                          <div className="text-xl font-semibold text-gray-900">{day.temp}</div>
                        </div>
                        {day.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Courses</h2>
            <p className="mt-2 text-gray-500">Discover exceptional golfing experiences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="group overflow-hidden rounded-3xl bg-white/20 p-0.5 shadow-lg backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-full rounded-[23px] bg-white/90 backdrop-blur-sm">
                  <div className="relative h-48 overflow-hidden rounded-t-[23px]">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">{course.name}</h3>
                        <span className="rounded-full bg-masters-yellow/90 px-2 py-1 text-xs font-medium text-black backdrop-blur-sm">
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{course.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-masters-yellow text-masters-yellow" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-50/80 p-3">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-masters-yellow" />
                        <span className="text-sm">
                          {course.weather.condition}, {course.weather.temp}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{course.distance}</span>
                    </div>

                    <Button className="w-full rounded-full bg-masters-green text-white shadow-sm transition-all hover:bg-masters-green/90 hover:shadow-md">
                      View Tee Times
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="rounded-full border-masters-green px-6 py-5 text-masters-green shadow-sm transition-all hover:bg-masters-green hover:text-white hover:shadow-md"
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Booking Widget */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white/20 p-0.5 shadow-lg backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-[23px] bg-gradient-to-br from-masters-green/90 to-masters-green/80 p-8 backdrop-blur-md">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h2 className="mb-2 text-2xl font-semibold text-white">Quick Tee Time</h2>
                  <p className="mb-6 text-white/80">Book a tee time for today with just a few taps</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                      <Calendar className="h-5 w-5 text-white" />
                      <span className="text-sm text-white">
                        Today, {currentTime.toLocaleDateString([], { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                      <Clock className="h-5 w-5 text-white" />
                      <span className="text-sm text-white">Afternoon (12PM - 4PM)</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                      <MapPin className="h-5 w-5 text-white" />
                      <span className="text-sm text-white">Within 15 miles</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 text-center">
                    <div className="text-sm font-medium text-white/80">Available Courses</div>
                    <div className="text-3xl font-bold text-white">8</div>
                    <div className="text-sm text-white/80">near you</div>
                  </div>
                  <Button className="w-full rounded-full bg-white px-6 py-6 text-masters-green shadow-sm transition-all hover:bg-white/90 hover:shadow-md">
                    Find Available Times
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/80 py-12 backdrop-blur-md">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-medium text-masters-green">
              <span className="text-xl">⛳</span>
              <span>ProShop</span>
            </div>

            <div className="flex gap-8">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-masters-green">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-masters-green">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-masters-green">
                Contact
              </Link>
            </div>

            <p className="text-sm text-gray-500">© 2025 ProShop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
