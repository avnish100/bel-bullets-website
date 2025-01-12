'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Medal } from "lucide-react"

export default function Events() {
  
  const events = [
    {
      id: 1,
      name: "Saturday Morning Group Run",
      date: "Every Saturday",
      time: "6:30 AM",
      location: "Cubbon Park Main Entrance",
      description: "Join us for our weekly group run. All paces welcome!"
    },
    {
      id: 2,
      name: "Wednesday Intervals - North Bengaluru",
      date: "Every Wednesday",
      time: "6:30 AM",
      location: "RMV Club Entrance, Dollars Colony",
      description: "Speed work and interval training to improve your pace."
    },
    {
      id: 3,
      name: "Wednesday Intervals - South Bengaluru",
      date: "Every Wednesday",
      time: "6:30 AM",
      location: "Kittur Rani Chenamma Stadium, Behind Madhavan Park",
      description: "Speed work and interval training to improve your pace."
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
        Upcoming Events
      </h1>
      
      <div className="grid gap-4 sm:gap-6 mb-12">
        {events.map((event) => (
          <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-xl sm:text-2xl leading-tight">
                {event.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">When:</span> {event.date} at {event.time}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">Where:</span> {event.location}
                </p>
              </div>
              <p className="text-base sm:text-lg leading-relaxed pt-1">
                {event.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="pt-6">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Find Your Next Race
              </h2>
              <p className="text-orange-50 text-lg">
                Discover hundreds of running events across India on MyNextBib. From 5K fun runs to full marathons, find the perfect race for your next challenge.
              </p>
              <Button 
                asChild 
                variant="secondary" 
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                <Link 
                  href="https://www.mynextbib.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Browse All Races
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-md">
            <Medal className="w-64 h-64" />
            </div>
          </div>  
        </CardContent>
      </Card>
    </div>
  )
}

