import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
        About BEL BULLETS
      </h1>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Introduction Card */}
        <Card className="shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
              The BEL BULLETS RUN CLUB is a community founded to make running a habit that's more fun and repeatable. 
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
              Founded in February 6 by two friends that run in the BEL area every other week , this community has aimed to primarily get it's members involved in the space as much as possible. So if you're looking to kickstart your new year with running more often you're in the right place !
              </p>
            </div>
          </CardContent>
        </Card>
        

        {/* What We Offer Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-base sm:text-lg">
              <li className="leading-relaxed">Weekly training sessions in North and South Bengaluru </li>
              <li className="leading-relaxed">Weekly social runs</li>
              <li className="leading-relaxed">Community leaderboard</li>
              <li className="leading-relaxed">Discounts on group registrations for races across the city </li>
              <li className="leading-relaxed">Exposure to other fitness centres by means of community mixers</li>
              <li className="leading-relaxed">Best dosas of Bengaluru</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}