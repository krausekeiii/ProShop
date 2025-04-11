import Image from "next/image"
import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for featured courses
const featuredCourses = [
  {
    id: 1,
    name: "Pine Valley Golf Club",
    location: "Pine Valley, NJ",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=500",
    price: "$89",
    tags: ["18 holes", "Cart included"],
    distance: "12 miles",
  },
  {
    id: 2,
    name: "Pebble Beach Golf Links",
    location: "Pebble Beach, CA",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500",
    price: "$125",
    tags: ["18 holes", "Ocean views"],
    distance: "15 miles",
  },
  {
    id: 3,
    name: "Augusta National",
    location: "Augusta, GA",
    rating: 5.0,
    image: "/placeholder.svg?height=300&width=500",
    price: "$150",
    tags: ["18 holes", "Championship course"],
    distance: "8 miles",
  },
]

export default function FeaturedCourses() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredCourses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{course.name}</h3>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <div className="mb-3 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              <span>{course.location}</span>
              <span className="ml-2 text-xs">({course.distance})</span>
            </div>
            <div className="mb-4 flex flex-wrap gap-1">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium text-green-700">From {course.price}</div>
              <Link href={`/course/${course.id}`}>
                <Button size="sm">View Times</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
