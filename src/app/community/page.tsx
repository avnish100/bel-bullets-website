import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Community() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-16 sm:mt-20 mb-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Responsive heading with better mobile size */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Join Our Community
        </h1>

        {/* Introduction Card */}
        <Card className="shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <p className="text-base sm:text-lg leading-relaxed">
              At Run Club, we're proud of our diverse and supportive community. Our members come from all walks of life, united by their passion for running and personal growth. We welcome runners of all levels, from beginners to experienced marathoners.
            </p>
          </CardContent>
        </Card>

        {/* How to Join Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">How to Join</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Joining Run Club is easy and free! Here's how you can become a part of our community:
              </p>
              <ol className="list-decimal pl-4 sm:pl-6 space-y-2 text-base sm:text-lg">
                <li className="leading-relaxed">Attend one of our weekly group runs (check our Events page for details)</li>
                <li className="leading-relaxed">Fill out a quick registration form at the run (we'll provide it)</li>
                <li className="leading-relaxed">Join our online communities to stay connected between runs</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Connect With Us Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Connect With Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Stay up to date with Run Club activities and connect with fellow runners through our social channels:
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4">
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base px-3 py-2 h-auto"
                >
                  <a 
                    href="https://www.strava.com/clubs/runclub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Strava
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base px-3 py-2 h-auto"
                >
                  <a 
                    href="https://chat.whatsapp.com/runclub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    WhatsApp
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base px-3 py-2 h-auto"
                >
                  <a 
                    href="https://www.instagram.com/runclub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}