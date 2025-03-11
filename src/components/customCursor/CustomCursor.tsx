// // import React, { useEffect, useRef, useState } from 'react'
// // import './customCursor.scss'

// // const CustomCursor: React.FC = () => {
// //   const cursorRef = useRef<HTMLDivElement>(null);
// //   const [isInteractive, setIsInteractive] = useState(false);

// //   useEffect(() => {
// //     const moveCursor = (e: MouseEvent) => {
// //       if (cursorRef.current) {
// //         cursorRef.current.style.left = `${e.clientX}px`;
// //         cursorRef.current.style.top = `${e.clientY}px`;
// //       }
// //     };

// //     const handleMouseOver = (e: MouseEvent) => {
// //         const target = e.target as HTMLElement;
// //         if (target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="hidden"]')) {
// //           setIsInteractive(true);
// //         }
// //       };
      

// //     const handleMouseOut = (e: MouseEvent) => {
// //       if ((e.target as HTMLElement).closest('a, button, input, textarea, select, [role="button"]')) {
// //         setIsInteractive(false);
// //       }
// //     };

// //     document.addEventListener('mousemove', moveCursor);
// //     document.addEventListener('mouseover', handleMouseOver);
// //     document.addEventListener('mouseout', handleMouseOut);

// //     return () => {
// //       document.removeEventListener('mousemove', moveCursor);
// //       document.removeEventListener('mouseover', handleMouseOver);
// //       document.removeEventListener('mouseout', handleMouseOut);
// //     };
// //   }, []);

// //   return (
// //     <div ref={cursorRef} className={`custom-cursor ${isInteractive ? 'interactive' : ''}`}>
// //       Смотреть<br />кейс
// //     </div>
// //   );
// // };

// // export default CustomCursor;
// import React, { useEffect, useRef, useState } from 'react'
// import './customCursor.scss'

// const CustomCursor: React.FC = () => {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const [isInteractive, setIsInteractive] = useState(false);
//   const [isHidden, setIsHidden] = useState(false);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       if (cursorRef.current) {
//         cursorRef.current.style.left = `${e.clientX}px`;
//         cursorRef.current.style.top = `${e.clientY}px`;
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest('.image-link')) {
//         setIsHidden(true);
//       } else if (target.closest('a, button, input, textarea, select, [role="button"]')) {
//         setIsInteractive(true);
//       }
//     };

//     const handleMouseOut = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest('.image-link')) {
//         setIsHidden(false);
//       } else if (target.closest('a, button, input, textarea, select, [role="button"]')) {
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

//   return (
//     <div ref={cursorRef} className={`custom-cursor ${isInteractive ? 'interactive' : ''} ${isHidden ? 'hidden' : ''}`}>
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
  // Убираем состояние isHidden, так как мы не хотим скрывать кастомный курсор на .image-link

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Для элементов .image-link не делаем ничего особенного
      // Для других интерактивных элементов применяем класс interactive
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
    <div ref={cursorRef} className={`custom-cursor ${isInteractive ? 'interactive' : ''}`}>
      Смотреть<br />кейс
    </div>
  );
};

export default CustomCursor;