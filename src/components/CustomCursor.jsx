import { useEffect, useState, useRef } from 'react';
import '../assets/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const isInteractiveElement = (element) => {
    if (!element || !element.matches) return false;
    const selectors = 'a, button, .product-card, .category-card, .nav-link, .hero-button';
    return element.matches(selectors) || element.closest(selectors) !== null;
  };

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let requestId;

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      
      requestId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsMoving(true);
    };

    const handleMouseStop = () => {
      setIsMoving(false);
    };

    const handleMouseEnter = (e) => {
      if (isInteractiveElement(e.target)) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (isInteractiveElement(e.target)) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Start animation
    animate();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseStop);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(requestId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseStop);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`cursor ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''} ${isMoving ? 'cursor-moving' : ''}`}
    >
      <div className="cursor-inner" />
      <div className="cursor-outer" />
    </div>
  );
};

export default CustomCursor; 