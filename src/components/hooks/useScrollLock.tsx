// import { useLayoutEffect } from 'react'

// /**
//  * Custom hook to prevent body scrolling when a modal/drawer is open
//  * @param {boolean} isLocked - Whether the scroll should be locked
//  */
// export default function useBodyScrollLock(isLocked: boolean) {
//   useLayoutEffect(() => {
//     // Skip if not locking scroll
//     if (!isLocked) return;
    
//     // Save original body style settings
//     const originalStyle = window.getComputedStyle(document.body);
//     const originalOverflow = originalStyle.overflow;
//     const scrollY = window.scrollY;
    
//     // Apply lock
//     document.body.style.overflow = 'hidden';
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.width = '100%';
    
//     // Return cleanup function
//     return () => {
//       document.body.style.overflow = originalOverflow;
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       window.scrollTo(0, scrollY);
//     };
//   }, [isLocked]); // Only re-run if isLocked changes
// }

import { useLayoutEffect, useRef } from 'react'

export default function useBodyScrollLock(isLocked: boolean) {
  const scrollYRef = useRef(0);

  useLayoutEffect(() => {
    if (!isLocked) return;

    scrollYRef.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isLocked]);
}