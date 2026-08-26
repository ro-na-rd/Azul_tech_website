import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the follower with lerp-like behavior
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onHoverEnter = () => setIsHovering(true);
    const onHoverLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const interactiveElements = document.querySelectorAll('button, a, .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHoverEnter);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Small immediate dot */}
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-slate rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? '#0ECFFE' : '#8591A9',
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ 
          backgroundColor: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
      />
      {/* Larger smooth follower */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border-2 border-brand-slate/30 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ 
          x: followerX, 
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? '#0ECFFE' : 'rgba(133, 145, 169, 0.3)',
          scale: isHovering ? 2 : 1,
          borderWidth: isHovering ? '1px' : '2px',
        }}
        transition={{ 
          borderColor: { duration: 0.3 },
          scale: { duration: 0.3 },
          borderWidth: { duration: 0.3 }
        }}
      />
    </>
  );
};

export default CustomCursor;
