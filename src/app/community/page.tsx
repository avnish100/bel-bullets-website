import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Community() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-3xl font-bold">Join Our Community</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg">
              At Run Club, we're proud of our diverse and supportive community. Our members come from all walks of life, united by their passion for running and personal growth. We welcome runners of all levels, from beginners to experienced marathoners.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How to Join</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg">
                Joining Run Club is easy and free! Here's how you can become a part of our community:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Attend one of our weekly group runs (check our Events page for details)</li>
                <li>Fill out a quick registration form at the run (we'll provide it)</li>
                <li>Join our online communities to stay connected between runs</li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Connect With Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg">
                Stay up to date with Run Club activities and connect with fellow runners through our social channels:
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline">
                  <a href="https://www.strava.com/clubs/runclub" target="_blank" rel="noopener noreferrer">Strava</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://chat.whatsapp.com/runclub" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://www.instagram.com/runclub" target="_blank" rel="noopener noreferrer">Instagram</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}