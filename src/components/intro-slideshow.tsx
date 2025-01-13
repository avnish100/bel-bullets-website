'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { overlayAnimation } from '../utils/animation'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  style: 'normal',
  weight: '400',
  subsets: ["latin"]
})

const coords = { lat: '12°58\'30"N', lon: '77°35\'36"E' }
const slides = [
  {
    id: 1,
    src: '/bbrc9.jpeg',
    alt: 'Motion blur figure',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 2,
    src: '/bbrc5.jpeg',
    alt: 'Silhouettes',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 3,
    src: '/bbrc7.jpeg',
    alt: 'Tree path',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 4,
    src: '/bbrc8.webp',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 5,
    src: '/bbrc10.jpeg',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 6,
    src: '/bbrc11.jpeg',
    alt: 'Motion blur figure',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 7,
    src: '/bbrc5.jpeg',
    alt: 'Silhouettes',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 8,
    src: '/bbrc6.jpeg',
    alt: 'Tree path',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 9,
    src: '/bbrc7.jpeg',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 10,
    src: '/bbrc8.webp',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  }
]

interface IntroSlideshowProps {
    onComplete: () => void
  }
  
  export function IntroSlideshow({ onComplete }: IntroSlideshowProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
  
    // Check for mobile viewport on mount and resize
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkMobile()
      window.addEventListener('resize', checkMobile)
      
      return () => window.removeEventListener('resize', checkMobile)
    }, [])
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
        }
      }, 250)
  
      return () => clearInterval(interval)
    }, [currentSlide, onComplete])
  
    return (
      <motion.div 
        style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'black',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={overlayAnimation}
      >
        <div className="relative w-full h-full md:h-1/2 md:w-1/2 p-4 md:p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 1 }}
              exit={currentSlide === slides.length - 1 ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 
                    className={`
                      text-white font-bold text-center drop-shadow-xl
                      text-4xl sm:text-5xl md:text-6xl lg:text-8xl
                      px-4 md:px-0
                      ${merriweather.className}
                    `}
                  >
                    {slides[currentSlide].text}
                  </h2>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
  
          {/* Coordinates - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4">
            <p className="text-white text-base md:text-xl font-mono">
              {slides[currentSlide].coordinates.lat}
            </p>
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4">
            <p className="text-white text-base md:text-xl font-mono">
              {slides[currentSlide].coordinates.lon}
            </p>
          </div>
  
          {/* Mobile coordinates positioning */}
          <div className="md:hidden absolute bottom-4 left-4">
            <p className="text-white text-sm font-mono">
              {slides[currentSlide].coordinates.lat}
            </p>
          </div>
          <div className="md:hidden absolute bottom-4 right-4">
            <p className="text-white text-sm font-mono">
              {slides[currentSlide].coordinates.lon}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }