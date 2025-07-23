// import { useLayoutEffect, useRef } from 'react'

// export default function useBodyScrollLock(isLocked: boolean) {
//   const scrollYRef = useRef(0);

//   useLayoutEffect(() => {
//     if (!isLocked) return;

//     scrollYRef.current = window.scrollY;
//     document.body.style.overflow = 'hidden';
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollYRef.current}px`;
//     document.body.style.width = '100%';

//     return () => {
//       document.body.style.overflow = '';
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       window.scrollTo(0, scrollYRef.current);
//     };
//   }, [isLocked]);
// }


import { useLayoutEffect, useRef } from 'react'

export default function useBodyScrollLock(isLocked: boolean) {
  const scrollYRef = useRef(0);
  
  useLayoutEffect(() => {
    if (!isLocked) return;
    
    scrollYRef.current = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body);
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.left = originalStyle.left;
      document.body.style.right = originalStyle.right;
      document.body.style.overflow = originalStyle.overflow;
      
      window.requestAnimationFrame(() => {
        window.scrollTo(0, scrollYRef.current);
      });
    };
  }, [isLocked]);
}