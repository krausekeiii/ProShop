"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, Sun, Cloud, CloudRain, Phone, Globe, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthModal } from "@/components/auth-modal"
import { BookingModal } from "@/components/booking-modal"

// Mock data for course details
const courseDetails = {
  id: 1,
  name: "Pine Valley Golf Club",
  location: "Pine Valley, NJ",
  rating: 4.9,
  image: "/placeholder.svg?height=400&width=800",
  description:
    "Pine Valley Golf Club is consistently ranked as one of the top courses in the world. The course features dramatic elevation changes, challenging hazards, and beautiful scenery throughout.",
  phone: "(555) 123-4567",
  website: "www.pinevalleygolfclub.com",
  amenities: [
    "18 holes, Par 72",
    "Pro shop",
    "Restaurant",
    "Practice facilities",
    "Locker rooms",
    "Cart rental",
    "Club rental",
    "Lessons available",
  ],
  weeklyForecast: [
    { day: "Monday", condition: "sunny", temp: "72°F", wind: "5 mph" },
    { day: "Tuesday", condition: "partly cloudy", temp: "68°F", wind: "8 mph" },
    { day: "Wednesday", condition: "cloudy", temp: "65°F", wind: "10 mph" },
    { day: "Thursday", condition: "rainy", temp: "62°F", wind: "15 mph" },
    { day: "Friday", condition: "sunny", temp: "70°F", wind: "7 mph" },
    { day: "Saturday", condition: "sunny", temp: "75°F", wind: "3 mph" },
    { day: "Sunday", condition: "partly cloudy", temp: "73°F", wind: "6 mph" },
  ],
  availableDays: [
    {
      date: "Friday, April 11, 2025",
      teeTimes: [
        { time: "07:30", price: "$89", available: 4 },
        { time: "08:15", price: "$89", available: 2 },
        { time: "09:00", price: "$99", available: 4 },
        { time: "10:30", price: "$109", available: 1 },
        { time: "12:00", price: "$99", available: 4 },
        { time: "13:30", price: "$89", available: 4 },
        { time: "15:00", price: "$79", available: 4 },
      ],
    },
    {
      date: "Saturday, April 12, 2025",
      teeTimes: [
        { time: "07:00", price: "$109", available: 2 },
        { time: "08:30", price: "$119", available: 4 },
        { time: "10:00", price: "$129", available: 2 },
        { time: "11:30", price: "$129", available: 4 },
        { time: "13:00", price: "$119", available: 4 },
        { time: "14:30", price: "$109", available: 2 },
      ],
    },
    {
      date: "Sunday, April 13, 2025",
      teeTimes: [
        { time: "07:15", price: "$99", available: 4 },
        { time: "08:45", price: "$109", available: 2 },
        { time: "10:15", price: "$119", available: 4 },
        { time: "11:45", price: "$119", available: 2 },
        { time: "13:15", price: "$109", available: 4 },
        { time: "14:45", price: "$99", available: 4 },
      ],
    },
  ],
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedTeeTime, setSelectedTeeTime] = useState<{
    time: string
    price: string
    date: string
  } | null>(null)

  // Function to render weather icon based on condition
  const renderWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  const handleBookTeeTime = (time: string, price: string, date: string) => {
    setSelectedTeeTime({
      time: new Date(`2025-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      price,
      date,
    })
    setIsBookingModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-green-700">
            <span className="text-xl">⛳</span>
            <span>Golf Assistant</span>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
            Sign In
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6 flex items-center">
          <Link href="/results">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg md:h-80">
              <Image
                src={courseDetails.image || "/placeholder.svg"}
                alt={courseDetails.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-800 md:text-3xl">{courseDetails.name}</h1>
              <Button variant="outline" size="sm" className="gap-1">
                <Heart className="h-4 w-4" />
                Save
              </Button>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{courseDetails.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{courseDetails.rating}</span>
              </div>
            </div>

            <p className="mb-6 text-muted-foreground">{courseDetails.description}</p>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm">{courseDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm">{courseDetails.website}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-lg font-medium">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {courseDetails.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h2 className="mb-3 text-lg font-medium">Weekly Weather Forecast</h2>
              <div className="space-y-2">
                {courseDetails.weeklyForecast.map((day) => (
                  <div key={day.day} className="flex items-center justify-between rounded-md border p-2">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex items-center gap-2">
                      {renderWeatherIcon(day.condition)}
                      <div className="text-right">
                        <p className="text-sm capitalize">{day.condition}</p>
                        <p className="text-xs text-muted-foreground">
                          {day.temp}, {day.wind}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="mb-6" />

        <div>
          <h2 className="mb-4 text-xl font-bold">Available Tee Times</h2>

          <Tabs defaultValue={courseDetails.availableDays[0].date}>
            <TabsList className="mb-4 w-full justify-start overflow-auto">
              {courseDetails.availableDays.map((day) => (
                <TabsTrigger key={day.date} value={day.date} className="min-w-max">
                  {day.date}
                </TabsTrigger>
              ))}
            </TabsList>

            {courseDetails.availableDays.map((day) => (
              <TabsContent key={day.date} value={day.date}>
                <Card>
                  <CardContent className="p-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {day.teeTimes.map((teeTime) => (
                        <div
                          key={teeTime.time}
                          className="flex flex-col items-center rounded-md border p-4 text-center hover:border-green-500 hover:bg-green-50"
                        >
                          <span className="mb-1 text-lg font-medium">
                            {new Date(`2025-01-01T${teeTime.time}`).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                          <span className="mb-1 text-lg font-bold text-green-700">{teeTime.price}</span>
                          <span className="mb-3 text-sm text-muted-foreground">
                            {teeTime.available} {teeTime.available === 1 ? "spot" : "spots"} available
                          </span>
                          <Button
                            size="sm"
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => handleBookTeeTime(teeTime.time, teeTime.price, day.date)}
                          >
                            Book Now
                          </Button>
                          <Button variant="ghost" size="sm" className="mt-1 w-full text-xs">
                            Add to Calendar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">© 2025 Golf Assistant. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-green-700">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-green-700">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-green-700">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {selectedTeeTime && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          courseInfo={{
            name: courseDetails.name,
            teeTime: selectedTeeTime.time,
            date: selectedTeeTime.date,
            price: selectedTeeTime.price,
          }}
        />
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
