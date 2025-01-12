import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const upcomingRuns = [
  {
    type: 'BEL BULLETS Intervals',
    name: 'Interval Training',
    when: 'Every Wednesday, 6:30 AM',
    distance: '3km',
    pace: 'Multiple',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSebM-ib8eYaLlRlcfASIDeKLxIMk5Yih-Hug4AIdjpq9YUBQQ/viewform'
  },
  {
    type: 'BEL BULLETS Weekend Run',
    name: 'BEL BULLETS Weekend Run',
    date: 'Every Saturday, 6:30 AM',
    distance: 'Multiple',
    pace: 'Multiple',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfvZ_ylAra2_teTxmu1AzoIKr_N4sXPPwSmNM8U6LwfrnzTkQ/viewform?usp=dialog'
  },
]

export function InfoSections() {
  return (
    <div className="bg-black text-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Pick your pace.</h2>
          <div className="space-y-6">
            {upcomingRuns.map((run, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 py-4">
                <div className="space-y-2 mb-4 sm:mb-0">
                  <Badge variant="default" className="border-none">
                    {run.type}
                  </Badge>
                  <h3 className="text-xl font-medium">{run.name}</h3>
                  <p className="text-white/60">{run.date || run.when}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button 
                    variant="default"
                    asChild
                    className="font-medium px-4 py-2 text-sm"
                  >
                    <Link href={run.formLink} target="_blank" rel="noopener noreferrer">
                      Register
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Join our community of 2500+ runners
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Whether you're looking to participate in our runs or help organize them, 
              there's a place for you in the BEL BULLETS family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="secondary"
                asChild
                className="font-medium px-8 py-3 text-lg"
              >
                <Link href='https://forms.gle/Df2xD3RX95Y7NhH37'>Volunteer</Link>
              </Button>
              <Button 
                variant="default"
                asChild
                className="font-medium px-8 py-3 text-lg "
              >
                <Link href='/register'>Register as Runner</Link>
              </Button>
            </div>
          </div>
        </section>
    </div>
  )
}

