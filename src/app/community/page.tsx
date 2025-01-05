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
            Hey! We’re an open community that runs every Saturday around metro friendly spots, the community is for everybody that would like to get into running/ is already an avid runner. We also register for events together try to train virtually and try to create a network of runners for each person around their locality. 

Once you finish one group run with us you are officially part of the community and will be eligible to take part in all other community activities .

Do join the WhatsApp community link to be able to participate in future runs . You will just need to be on the announcements channel for this :)
            </p>
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