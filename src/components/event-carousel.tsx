'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from "embla-carousel-autoplay"
import { client } from '@/sanity/lib/client'

const query = `*[_type == "event"]{
  _id,
  "imageUrl": image.asset->url,
  "mobileImageUrl": mobileImage.asset->url,
  title,
  description,
  signUpLink,
  objectfit,
  isSponsor
}`

interface Event {
  _id: string;
  imageUrl: string;
  mobileImageUrl?: string;
  title: string;
  description: string;
  signUpLink: string;
  objectfit?: string;
  isSponsor?: boolean;
}

export function EventCarousel({ autoPlayInterval = 4000 }) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    client.fetch(query).then((data) => {
      setEvents(data)
      console.log(data)
    })
  }, [])

  const plugin = React.useMemo(
    () => 
      Autoplay({ 
        delay: autoPlayInterval, 
        stopOnMouseEnter: true, 
        stopOnInteraction: false 
      }),
    [autoPlayInterval]
  )

  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
  })


  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Carousel 
        ref={emblaRef} 
        plugins={[plugin]}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event._id}>
              <Card className="relative overflow-hidden">
                <div className="aspect-[3/4] sm:aspect-[16/9] lg:aspect-[2/1]">
                  {event.isSponsor ? (
                    event.mobileImageUrl ? (
                      <>
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="hidden sm:block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <img 
                          src={event.mobileImageUrl} 
                          alt={event.title} 
                          className="block sm:hidden w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </>
                    ) : (
                      <a href={event.signUpLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </a>
                    )
                  ) : (
                    <>
                      {event.mobileImageUrl ? (
                        <>
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="hidden sm:block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <img 
                            src={event.mobileImageUrl} 
                            alt={event.title} 
                            className="block sm:hidden w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </>
                      ) : (
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className={`w-full h-full object-${event.objectfit || 'cover'} transition-transform duration-300 group-hover:scale-105`}
                        />
                      )}
                      
                      {/* Overlay container */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 lg:p-8">
                        {/* Default overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 transition-opacity duration-300 group-hover:opacity-0" />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        {/* Content */}
                        <div className="relative z-10 w-full text-center">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-white">
                            {event.title}
                          </h3>
                          <div className="mb-3 sm:mb-4 overflow-hidden">
                            <p className="text-white text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
                              {event.description}
                            </p>
                          </div>
                          <Button 
                            asChild 
                            variant="secondary" 
                            className="w-full max-w-xs transition-all duration-300 hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
                          >
                            <a 
                              href={event.signUpLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm sm:text-base"
                            >
                              Sign Up
                            </a>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="sm:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </div>
  )
}

export default EventCarousel

