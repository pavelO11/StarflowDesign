// import React, { useEffect, useRef, useState } from 'react'
// import './customCursor.scss'

// const CustomCursor: React.FC = () => {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const [isInteractive, setIsInteractive] = useState(false);
//   const [isInFooter, setIsInFooter] = useState(false);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       if (cursorRef.current) {
//         cursorRef.current.style.left = `${e.clientX}px`;
//         cursorRef.current.style.top = `${e.clientY}px`;
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       // Check if not in footer or the element isn't in footer before changing interactive state
//       if (!target.closest('footer') && 
//           target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
//         setIsInteractive(true);
//       }
//     };

//     const handleMouseOut = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
//         setIsInteractive(false);
//       }
//     };

//     document.addEventListener('mousemove', moveCursor);
//     document.addEventListener('mouseover', handleMouseOver);
//     document.addEventListener('mouseout', handleMouseOut);

//     return () => {
//       document.removeEventListener('mousemove', moveCursor);
//       document.removeEventListener('mouseover', handleMouseOver);
//       document.removeEventListener('mouseout', handleMouseOut);
//     };
//   }, []);

//   useEffect(() => {
//     const handleFooterIntersection = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           setIsInFooter(true);
//         } else {
//           setIsInFooter(false);
//         }
//       });
//     };
  
//     const observer = new IntersectionObserver(handleFooterIntersection, {
//       threshold: 0.1
//     });
    
//     const footer = document.querySelector('footer'); // Your footer element
//     if (footer) {
//       observer.observe(footer);
//     }
    
//     return () => {
//       if (footer) observer.unobserve(footer);
//     };
//   }, []);

//   return (
//     <div 
//       ref={cursorRef} 
//       className={`custom-cursor ${isInteractive ? 'interactive' : ''} ${isInFooter ? 'hidden-in-footer' : ''}`}
//     >
//       Смотреть<br />кейс
//     </div>
//   );
// };

// export default CustomCursor;

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
          const cursorRect = cursorRef.current.getBoundingClientRect();
          if (
            cursorRect.left >= footerRect.left &&
            cursorRect.right <= footerRect.right &&
            cursorRect.top >= footerRect.top &&
            cursorRect.bottom <= footerRect.bottom
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
      if (!target.closest('footer') && 
          target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
        setIsInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('footer') && 
          target.closest('a:not(.image-link), button, input, textarea, select, [role="button"]:not(.image-link)')) {
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