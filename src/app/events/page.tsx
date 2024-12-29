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
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{event.date} at {event.time}</p>
              <p className="text-muted-foreground mb-2">{event.location}</p>
              <p>{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

