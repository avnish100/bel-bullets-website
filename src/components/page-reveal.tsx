// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, useAnimation } from 'framer-motion'

// export function PageReveal() {
//   const [percentage, setPercentage] = useState(0)
//   const controls = useAnimation()

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPercentage(prev => {
//         const increment = Math.floor(Math.random() * 10) + 1
//         const newValue = Math.min(prev + increment, 100)
//         if (newValue === 100) {
//           clearInterval(interval)
//           setTimeout(() => {
//             controls.start("hidden")
//           }, 500)
//         }
//         return newValue
//       })
//     }, 100)

//     return () => clearInterval(interval)
//   }, [controls])

//   const overlayVariants = {
//     visible: { y: 0 },
//     hidden: { y: '-100%', transition: { duration: 0.8, ease: 'easeInOut' } }
//   }

//   return (
//     <motion.div 
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center"
//       initial="visible"
//       animate={controls}
//       variants={overlayVariants}
//     >
//       <motion.div 
//         className="text-6xl md:text-8xl font-bold text-white tracking-tight"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {percentage}%
//       </motion.div>
//     </motion.div>
//   )
// }

