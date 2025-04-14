"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Sun, Cloud, CloudRain, Wind, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookingModal } from "./booking-modal"
import { motion } from "framer-motion"

type TeeTime = {
  time: string
  price: string
  available: number
}

type Weather = {
  condition: string
  temp: string
  wind: string
}

type Course = {
  id: number
  name: string
  location: string
  rating: number
  image: string
  distance: string
  teeTimes: TeeTime[]
  features: string[]
  weather: Weather
}

export default function CourseCard({ course }: { course: Course }) {
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
        return <Sun className="h-5 w-5 text-masters-yellow" />
      case "partly cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-masters-yellow" />
    }
  }

  const handleBookTeeTime = (time: string, price: string) => {
    // Get today's date for the booking modal
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    setSelectedTeeTime({
      time: new Date(`2025-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      price,
      date: today,
    })
    setIsBookingModalOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden rounded-2xl border-0 shadow-md transition-all hover:shadow-lg">
          <div className="grid gap-4 md:grid-cols-[350px_1fr]">
            <div className="relative h-56 md:h-full">
              <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 md:bottom-auto md:left-4 md:top-4">
                <Badge className="rounded-full bg-white/90 px-3 py-1 text-masters-green backdrop-blur-sm">
                  {course.distance}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4 grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  <div className="flex items-center rounded-full bg-gray-50 px-2 py-1">
                    <Star className="mr-1 h-4 w-4 fill-masters-yellow text-masters-yellow" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-3.5 w-3.5" />
                  <span>{course.location}</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {course.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="outline"
                    className="rounded-full border-gray-200 text-xs font-normal text-gray-600"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-xl bg-gray-50 p-3">
                <div>{renderWeatherIcon(course.weather.condition)}</div>
                <div>
                  <p className="text-sm font-medium capitalize text-gray-700">{course.weather.condition}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{course.weather.temp}</span>
                    <span className="flex items-center">
                      <Wind className="mr-1 h-3 w-3" />
                      {course.weather.wind}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="mb-5">
                <h4 className="mb-3 font-medium text-gray-900">Available Tee Times</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {course.teeTimes.map((teeTime) => (
                    <motion.button
                      key={teeTime.time}
                      className="flex flex-col items-center rounded-xl border border-gray-200 p-3 text-center transition-all hover:border-masters-green hover:bg-masters-green/5"
                      onClick={() => handleBookTeeTime(teeTime.time, teeTime.price)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="mb-1 flex items-center text-sm font-medium text-gray-700">
                        <Clock className="mr-1 h-3.5 w-3.5 text-masters-green" />
                        {new Date(`2025-01-01T${teeTime.time}`).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>

                      <span className="text-base font-bold text-masters-green">{teeTime.price}</span>
                      <span className="text-xs text-gray-500">
                        {teeTime.available} {teeTime.available === 1 ? "spot" : "spots"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Link href={`/course/${course.id}`}>
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-masters-green"
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  className="rounded-full bg-masters-green text-white hover:bg-masters-green/90"
                  onClick={() => handleBookTeeTime(course.teeTimes[0].time, course.teeTimes[0].price)}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      {selectedTeeTime && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          courseInfo={{
            name: course.name,
            teeTime: selectedTeeTime.time,
            date: selectedTeeTime.date,
            price: selectedTeeTime.price,
          }}
        />
      )}
    </>
  )
}
