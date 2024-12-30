import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
        About Run Club
      </h1>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Introduction Card */}
        <Card className="shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Welcome to Run Club, a community of passionate runners dedicated to promoting health, fitness, and camaraderie through the sport of running.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Founded in 2010, Run Club has grown from a small group of friends to a thriving community of runners of all levels. Whether you're a beginner looking to complete your first 5K or an experienced marathoner aiming for a personal best, Run Club offers support, motivation, and resources to help you achieve your goals.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg leading-relaxed">
              Our mission is to inspire and empower individuals to embrace an active lifestyle through running. We believe that running is not just about physical fitness, but also about mental well-being and building lasting friendships.
            </p>
          </CardContent>
        </Card>

        {/* What We Offer Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-base sm:text-lg">
              <li className="leading-relaxed">Weekly group runs for all levels</li>
              <li className="leading-relaxed">Training programs for various race distances</li>
              <li className="leading-relaxed">Educational workshops on running techniques and injury prevention</li>
              <li className="leading-relaxed">Social events to connect with fellow runners</li>
              <li className="leading-relaxed">Volunteer opportunities at local running events</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}