import React, { useEffect, useRef, useState } from 'react'
import './customCursor.scss'

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;

        const footer = document.querySelector('footer');
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          // Add tolerance buffer for footer detection (5px)
          const tolerance = 5;
          
          // Check if cursor is near or inside footer
          if (
            e.clientX >= footerRect.left - tolerance &&
            e.clientX <= footerRect.right + tolerance &&
            e.clientY >= footerRect.top - tolerance &&
            e.clientY <= footerRect.bottom + tolerance
          ) {
            setIsInFooter(true);
          } else {
            setIsInFooter(false);
          }
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
        setIsInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
        setIsInteractive(false);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isInteractive ? 'interactive' : ''} ${isInFooter ? 'hidden-in-footer' : ''}`}
    >
      Смотреть<br />кейс
    </div>
  );
};

export default CustomCursor;