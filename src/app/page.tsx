  'use client'

  import { Button } from '@/components/ui/button'
  import Link from 'next/link'
  import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
  import { InfoSections } from '@/components/info-sections'
  import { useEffect, useRef, useState } from 'react'
  import Lenis from 'lenis'
  import Image from 'next/image'
  import { Merriweather } from 'next/font/google'
  import { IntroSlideshow } from '@/components/intro-slideshow'
  import { EventCarousel } from '@/components/event-carousel'
  const merriweather = Merriweather({
    style: 'normal',
    weight: '400',
    subsets: ["latin"]
  })

  const events = [
    {
      id: 1,
      title: "Redbull Wings for Life World Run",
      date: "May 4, 2025",
      time: "4:30 PM",
      objectfit: "contain",
      location: "Everywhere",
      imageUrl : "redbull-wings-for-life.png",
      mobileImageUrl: "redbull-wings-for-life-world-run.png",
      description: "Let's run for those who can't. Join us for the Wings for Life World Run. All proceeds go to spinal cord research. Sign up now!",
      signUpLink: "https://forms.gle/UrvasxyvvBwJDHx19"
    },
    {
      id: 2,
      title: "Saturday Morning Group Run",
      date: "Every Saturday",
      time: "6:30 AM",
      location: "Cubbon Park Main Entrance",
      imageUrl : "bbrc8.webp",
      description: "Join us for our weekly group run. All paces welcome!",
      signUpLink: "https://docs.google.com/forms/d/e/1FAIpQLSfvZ_ylAra2_teTxmu1AzoIKr_N4sXPPwSmNM8U6LwfrnzTkQ/viewform?usp=dialog"
    },
    {
      id: 3,
      title: "Wednesday Intervals - North Bengaluru",
      date: "Every Wednesday",
      time: "6:30 AM",
      location: "RMV Club Entrance, Dollars Colony",
      imageUrl : "bbrc7.jpeg",
      description: "Speed work and interval training to improve your pace.",
      signUpLink: "https://docs.google.com/forms/d/e/1FAIpQLSebM-ib8eYaLlRlcfASIDeKLxIMk5Yih-Hug4AIdjpq9YUBQQ/viewform"
    },
    {
      id: 4,
      title: "Wednesday Intervals - South Bengaluru",
      date: "Every Wednesday",
      time: "7:00 PM",
      imageUrl:'bbrc6.jpeg',
      location: "Kittur Rani Chenamma Stadium, Behind Madhavan Park",
      description: "Speed work and interval training to improve your pace.",
      signUpLink: "https://docs.google.com/forms/d/e/1FAIpQLSebM-ib8eYaLlRlcfASIDeKLxIMk5Yih-Hug4AIdjpq9YUBQQ/viewform"
    },
  ]

  function ScrollingContent() {
    return (
      <div className="flex flex-nowrap items-center gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 flex-shrink-0">
            <div className={`text-4xl md:text-6xl lg:text-9xl ${merriweather.className}`}>BEL</div>
            <Image
              src="/bel-bullets-logo.png"
              alt="Scrolling icons"
              width={150}
              height={150}
              className="object-contain md:w-48 md:h-48 lg:w-72 lg:h-72"
            />
            <div className={`text-4xl md:text-6xl lg:text-9xl ${merriweather.className}`}>BULLETS</div>
            <Image
              src="/bel-bullets-logo.png"
              alt="Scrolling icons"
              width={150}
              height={150}
              className="object-contain md:w-48 md:h-48 lg:w-72 lg:h-72"
            />
          </div>
        ))}
      </div>
    );
  }

  export default function Home() {
    const targetRef = useRef<HTMLDivElement>(null)
    const [showSlideshow, setShowSlideshow] = useState(true)
    const { scrollYProgress } = useScroll({
      target: targetRef.current ? targetRef as React.RefObject<HTMLElement> : undefined,
      offset: ["start end", "end start"]
    })

    useEffect(() => {
      const lenis = new Lenis()

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }, [])

    const x = useTransform(scrollYProgress, [0, 1], ["-50%", "-100%"])

    return (
      <>
        <AnimatePresence>
          {showSlideshow && (
            <IntroSlideshow onComplete={() => setShowSlideshow(false)} />
          )}
        </AnimatePresence>
        <main className="relative min-h-screen flex flex-col items-center justify-center">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-6 mb-12 mt-[20%]">
            <h1 className={`text-6xl md:text-8xl font-bold text-white tracking-tight ${merriweather.className}`}>
              BEL BULLETS
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              Run Club
            </p>
          </div>

          {/* Events Carousel */}
          <div className="relative z-10 w-full max-w-7xl px-8 sm:px-6 lg:px-8 mt-[10%]">
            <EventCarousel />
          </div>
        </main>

        <div ref={targetRef} className="py-16 overflow-hidden">
          <motion.div style={{ x }}>
            <ScrollingContent />
          </motion.div>
        </div>

        <InfoSections />

      </>
    )
  }

