import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Events() {
  const events = [
    {
      id: 1,
      name: "Saturday Morning Group Run",
      date: "Every Saturday",
      time: "8:00 AM",
      location: "City Park Main Entrance",
      description: "Join us for our weekly group run. All paces welcome!"
    },
    {
      id: 2,
      name: "Midweek Track Workout",
      date: "Every Wednesday",
      time: "6:30 PM",
      location: "Local High School Track",
      description: "Speed work and interval training to improve your pace."
    },
    {
      id: 3,
      name: "Annual City Marathon",
      date: "October 15, 2023",
      time: "7:00 AM",
      location: "Downtown City Center",
      description: "Our biggest event of the year! Choose from full marathon, half marathon, or 10K distances."
    },
    {
      id: 4,
      name: "Trail Running Adventure",
      date: "First Sunday of every month",
      time: "7:30 AM",
      location: "Mountain Trail Parking Lot",
      description: "Explore local trails and enjoy nature with fellow runners."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
        Upcoming Events
      </h1>
      
      <div className="grid gap-4 sm:gap-6">
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
    </div>
  )
}