import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const upcomingRuns = [
  {
    type: 'BEL BULLETS Intervals',
    name: 'Interval Training',
    date: 'December 20, 2024 5:45 am',
    distance: '5.8km',
    pace: '±37'
  },
  {
    type: 'BEL BULLETS Weekend Run',
    name: 'BEL BULLETS Weekend Run',
    date: 'December 24, 2024 6:30 pm',
    distance: '3km',
    pace: 'Multiple'
  },
  {
    type: 'BEL BULLETS Weekend Run',
    name: 'BEL BULLETS Weekend Run',
    date: 'December 24, 2024 6:30 pm',
    distance: '5km',
    pace: 'Multiple'
  },
  {
    type: 'BEL BULLETS Weekend Run',
    name: 'BEL BULLETS Weekend Run',
    date: 'December 24, 2024 6:30 pm',
    distance: '10km',
    pace: 'Multiple'
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
              <div key={index} className="flex items-center justify-between border-t border-white/10 py-4">
                <div className="space-y-2">
                  <Badge variant="default" className=" border-none">
                    {run.type}
                  </Badge>
                  <h3 className="text-xl font-medium">{run.name}</h3>
                  <p className="text-white/60">{run.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white/10 border-none">
                      {run.distance}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-none">
                      {run.pace}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block rounded-full overflow-hidden mb-6">
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Running with 6504 and counting.
          </h2>
          <Button 
          variant="default"
          asChild
            className="font-medium px-8 py-6 text-lg"
          >
            <Link href='/register'>Register Now </Link>
            
          </Button>
        </div>
      </section>
    </div>
  )
}

