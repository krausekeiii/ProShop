import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Sun, Cloud, CloudRain, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <div className="relative h-48 md:h-full">
          <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
        </div>

        <CardContent className="p-4 md:p-6">
          <div className="mb-4 grid gap-2 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-xl font-bold">{course.name}</h3>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                <span>{course.location}</span>
                <span className="ml-2">({course.distance})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md border p-2">
              <div>{renderWeatherIcon(course.weather.condition)}</div>
              <div>
                <p className="text-sm font-medium capitalize">{course.weather.condition}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{course.weather.temp}</span>
                  <span className="flex items-center">
                    <Wind className="mr-1 h-3 w-3" />
                    {course.weather.wind}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-1">
            {course.features.map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <Separator className="mb-4" />

          <div className="mb-4">
            <h4 className="mb-2 font-medium">Available Tee Times</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {course.teeTimes.map((teeTime) => (
                <div
                  key={teeTime.time}
                  className="flex flex-col items-center rounded-md border p-2 text-center hover:border-green-500 hover:bg-green-50"
                >
                  <span className="text-sm font-medium">
                    {new Date(`2025-01-01T${teeTime.time}`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>

                  <span className="text-sm font-bold text-green-700">{teeTime.price}</span>
                  <span className="text-xs text-muted-foreground">
                    {teeTime.available} {teeTime.available === 1 ? "spot" : "spots"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Link href={`/course/${course.id}`}>
              <Button variant="outline">View Course Details</Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">Book Tee Time</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
