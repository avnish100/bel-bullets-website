'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { InfoSections } from '@/components/info-sections'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis';
import Image from 'next/image'
import { Merriweather } from 'next/font/google'
import { IntroSlideshow } from '@/components/intro-slideshow'

const merriweather = Merriweather({
  style: 'normal',
  weight: '400',
  subsets: ["latin"]
})

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [showSlideshow, setShowSlideshow] = useState(true)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  useEffect( () => {

    const lenis = new Lenis()



    function raf(time) {

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
      <main className="relative min-h-screen flex items-center justify-center">
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
        <div className="relative z-10 text-center space-y-6">
          <h1 className={`text-6xl md:text-8xl font-bold text-white tracking-tight ${merriweather.className}`}>
            BEL BULLETS
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Run Club
          </p>
        </div>
        </main>
        <div ref={targetRef} className="py-16 overflow-hidden">
      <motion.div 
        className="flex items-center"
        style={{ x }}
      >
        <div className="flex">
          <div className={`text-9xl content-center ${merriweather.className}`}>
            BEL
          </div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>BULLETS</div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>
            BEL
          </div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>BULLETS</div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>
            BEL
          </div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>BULLETS</div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>
            BEL
          </div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>BULLETS</div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>
            BEL
          </div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className={`text-9xl content-center ${merriweather.className}`}>BULLETS</div>
          <Image
            src="/bel-bullets-logo.png"
            alt="Scrolling icons"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
      <InfoSections />
      
    </>
  )
}

