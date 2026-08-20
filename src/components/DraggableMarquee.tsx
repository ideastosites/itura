import { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface DraggableMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
}

export default function DraggableMarquee({ children, speed = 1, direction = 'left' }: DraggableMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  const positionRef = useRef(0);
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const isDragClickRef = useRef(false);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        if (!isHovered && !isDragging) {
           const move = (speed * delta) / 16;
           if (direction === 'left') {
             positionRef.current -= move;
           } else {
             positionRef.current += move;
           }
        }
      }
      lastTimeRef.current = time;
      
      if (trackRef.current) {
         // track contains 2 identical halves
         const halfWidth = trackRef.current.scrollWidth / 2;
         if (halfWidth > 0) {
           // wrap around logic
           if (positionRef.current <= -halfWidth) {
              positionRef.current += halfWidth;
           } else if (positionRef.current > 0) {
              positionRef.current -= halfWidth;
           }
           trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
         }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isDragging, speed, direction]);

  const onDragStart = (x: number, clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartX(x - positionRef.current);
    dragStartPosRef.current = { x: clientX, y: clientY };
    isDragClickRef.current = false;
  };
  
  const onDragMove = (x: number, clientX: number, clientY: number) => {
    if (!isDragging) return;
    positionRef.current = x - startX;
    
    if (Math.abs(clientX - dragStartPosRef.current.x) > 5 || Math.abs(clientY - dragStartPosRef.current.y) > 5) {
      isDragClickRef.current = true;
    }
  };
  
  const onDragEnd = () => {
    setIsDragging(false);
    // don't immediately clear isDragClickRef here so that onClickCapture can still catch it
    // it will be reset on the next onDragStart
  };

  const handleClickCapture = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); onDragEnd(); }}
      
      onMouseDown={(e) => onDragStart(e.pageX, e.clientX, e.clientY)}
      onMouseMove={(e) => onDragMove(e.pageX, e.clientX, e.clientY)}
      onMouseUp={onDragEnd}
      
      onTouchStart={(e) => onDragStart(e.touches[0].clientX, e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX, e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={onDragEnd}
      
      onClickCapture={handleClickCapture}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
        {children}
      </div>
    </div>
  );
}