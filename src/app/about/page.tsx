import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">About Run Club</h1>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="mb-4">
            Welcome to Run Club, a community of passionate runners dedicated to promoting health, fitness, and camaraderie through the sport of running.
          </p>
          <p className="mb-4">
            Founded in 2010, Run Club has grown from a small group of friends to a thriving community of runners of all levels. Whether you're a beginner looking to complete your first 5K or an experienced marathoner aiming for a personal best, Run Club offers support, motivation, and resources to help you achieve your goals.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our mission is to inspire and empower individuals to embrace an active lifestyle through running. We believe that running is not just about physical fitness, but also about mental well-being and building lasting friendships.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>Weekly group runs for all levels</li>
            <li>Training programs for various race distances</li>
            <li>Educational workshops on running techniques and injury prevention</li>
            <li>Social events to connect with fellow runners</li>
            <li>Volunteer opportunities at local running events</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

