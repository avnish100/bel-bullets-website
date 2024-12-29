export const overlayAnimation = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }
  
  export const slideAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }
  
  