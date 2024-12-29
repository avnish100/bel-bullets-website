'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { overlayAnimation } from '../utils/animation'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  style: 'normal',
  weight: '400'
})

const coords = { lat: '12°58\'30"N', lon: '77°35\'36"E' }
const slides = [
  {
    id: 1,
    src: '/spot-runs-start-la.jpg',
    alt: 'Motion blur figure',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 2,
    src: '/pexels-photo-1072705.jpeg',
    alt: 'Silhouettes',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 3,
    src: '/pexels-photo-1564470.jpeg',
    alt: 'Tree path',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 4,
    src: '/relay-race-competition-stadium-sport.jpg',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 5,
    src: '/pexels-photo-2524740.jpeg',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 6,
    src: '/spot-runs-start-la.jpg',
    alt: 'Motion blur figure',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 7,
    src: '/pexels-photo-1072705.jpeg',
    alt: 'Silhouettes',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 8,
    src: '/pexels-photo-1564470.jpeg',
    alt: 'Tree path',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 9,
    src: '/relay-race-competition-stadium-sport.jpg',
    alt: 'Group photo',
    text: 'BEL BULLETS',
    coordinates: coords
  },
  {
    id: 10,
    src: '/pexels-photo-2524740.jpeg',
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1)
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 1000)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [currentSlide, onComplete])

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={overlayAnimation}
    >
      <div className="relative h-1/2 w-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 1 }}
            exit={currentSlide === slides.length - 1 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority
            />  
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className={`text-white text-8xl font-bold text-center drop-shadow-xl ${merriweather.className}`}>
                {slides[currentSlide].text}
              </h2>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4">
          <p className="text-white text-xl font-mono">{slides[currentSlide].coordinates.lat}</p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4">
          <p className="text-white text-xl font-mono">{slides[currentSlide].coordinates.lon}</p>
        </div>
      </div>
    </motion.div>
  )
}

