import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CourseCard from "@/components/course-card"

// Mock data for search results
const mockCourses = [
  {
    id: 1,
    name: "Pine Valley Golf Club",
    location: "Pine Valley, NJ",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400",
    distance: "12 miles",
    teeTimes: [
      { time: "07:30", price: "$89", available: 4 },
      { time: "08:15", price: "$89", available: 2 },
      { time: "09:00", price: "$99", available: 4 },
      { time: "10:30", price: "$109", available: 1 },
    ],
    features: ["18 holes", "Cart included", "Pro shop", "Restaurant"],
    weather: { condition: "sunny", temp: "72°F", wind: "5 mph" },
  },
  {
    id: 2,
    name: "Merion Golf Club",
    location: "Ardmore, PA",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400",
    distance: "8 miles",
    teeTimes: [
      { time: "08:00", price: "$75", available: 4 },
      { time: "09:15", price: "$85", available: 4 },
      { time: "10:45", price: "$95", available: 2 },
    ],
    features: ["18 holes", "Walking only", "Historic course"],
    weather: { condition: "partly cloudy", temp: "68°F", wind: "8 mph" },
  },
  {
    id: 3,
    name: "Baltusrol Golf Club",
    location: "Springfield, NJ",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    distance: "15 miles",
    teeTimes: [
      { time: "07:45", price: "$95", available: 2 },
      { time: "09:30", price: "$105", available: 4 },
      { time: "11:15", price: "$115", available: 4 },
    ],
    features: ["18 holes", "Cart included", "Championship course"],
    weather: { condition: "cloudy", temp: "65°F", wind: "10 mph" },
  },
  {
    id: 4,
    name: "Shinnecock Hills Golf Club",
    location: "Southampton, NY",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400",
    distance: "20 miles",
    teeTimes: [
      { time: "08:30", price: "$120", available: 4 },
      { time: "10:00", price: "$130", available: 2 },
      { time: "12:15", price: "$120", available: 4 },
    ],
    features: ["18 holes", "Links style", "Ocean views"],
    weather: { condition: "rainy", temp: "62°F", wind: "15 mph" },
  },
]

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { date?: string; time?: string; location?: string }
}) {
  const { date = "2025-04-12", time = "09:00", location = "Philadelphia, PA" } = searchParams

  // Format the date for display
  const displayDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-green-700">
            <span className="text-xl">⛳</span>
            <span>Golf Assistant</span>
          </Link>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-green-800 md:text-2xl">Tee Times Results</h1>
          <div></div> {/* Empty div for flex alignment */}
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{displayDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(`2025-01-01T${time}`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{location}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>

              <Button variant="outline" size="sm" className="gap-1">
                Edit Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Found {mockCourses.length} courses with available tee times</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Distance</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  )
}
