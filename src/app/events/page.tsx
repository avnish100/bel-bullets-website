'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Medal, ExternalLink } from 'lucide-react'

export default function Events() {
  const events = [
    {
      id: 1,
      name: "Saturday Morning Group Run",
      date: "Every Saturday",
      time: "6:30 AM",
      location: "Cubbon Park Main Entrance",
      description: "Join us for our weekly group run. All paces welcome!",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfvZ_ylAra2_teTxmu1AzoIKr_N4sXPPwSmNM8U6LwfrnzTkQ/viewform?usp=dialog"
    },
    {
      id: 2,
      name: "Wednesday Intervals - North Bengaluru",
      date: "Every Wednesday",
      time: "6:30 AM",
      location: "RMV Club Entrance, Dollars Colony",
      description: "Speed work and interval training to improve your pace.",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSebM-ib8eYaLlRlcfASIDeKLxIMk5Yih-Hug4AIdjpq9YUBQQ/viewform"
    },
    {
      id: 3,
      name: "Wednesday Intervals - South Bengaluru",
      date: "Every Wednesday",
      time: "7:00 PM",
      location: "Kittur Rani Chenamma Stadium, Behind Madhavan Park",
      description: "Speed work and interval training to improve your pace.",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSebM-ib8eYaLlRlcfASIDeKLxIMk5Yih-Hug4AIdjpq9YUBQQ/viewform"
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
              <div className="pt-2">
                <Button asChild>
                  <Link 
                    href={event.formLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Register
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 h-2" />
        <CardContent className="pt-6 bg-gradient-to-br from-blue-100 to-red-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              
            </div>
            <div className="flex-grow space-y-4 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                RedBull Wings for Life World Run
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Join the global running event for those who can't. 100% of entry fees go to spinal cord research.
              </p>
              <Button 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Link 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeAPbFmGmGfPIoO4uly0BtJv_XuBed5OWPqId-HCe-wCKIIQg/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Register Now
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-none bg-gradient-to-r from-orange-500 to-orange-600 text-white mb-6">
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

