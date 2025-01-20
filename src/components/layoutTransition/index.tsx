// import { motion } from 'framer-motion'
// import React, { FC, useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import './layout.scss'

// interface CurveProps {
//   children: React.ReactNode;
//   backgroundColor?: string;
// }

// interface Dimensions {
//   width: number;
//   height: number;
// }

// const anim = (variants: any) => ({
//   initial: 'initial',
//   animate: 'enter',
//   exit: 'exit',
//   variants,
// });

// const Curve: FC<CurveProps> = ({ children, backgroundColor }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [dimensions, setDimensions] = useState<Dimensions>({
//     width: 0,
//     height: 0,
//   });

//   useEffect(() => {
//     const resize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     resize();

//     window.addEventListener('resize', resize);
//     return () => window.removeEventListener('resize', resize);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (location.pathname !== '/') {
//         navigate(location.pathname);
//         document.body.style.overflow = 'hidden';
//       }
//     }, 3000);
//     const enableScroll = () => {
//         document.body.style.overflow = '';
//     };
//     return () => {
//         clearTimeout(timer);
//         enableScroll()
//     };
//   }, [location.pathname, navigate]);

//   const text = {
//     initial: {
//       opacity: 1,
//       pointerEvents: 'auto',
//     },
//     enter: {
//       opacity: 0,
//       top: '-100px',
//       transition: {
//         duration: 0.9,
//         delay: 3,
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '58%',
//         pointerEvents: 'none',
//       },
//     },
//     exit: {
//       opacity: 1,
//       top: '50%',
//       transition: {
//         duration: 0.9,
//         delay: 0.4,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   return (
//     <motion.section
//       className="SectionPage"
//       style={{ backgroundColor }}
//     >
//       <motion.p {...anim(text)} className='loadingText'>Starflow Design<span className='labelc'>©</span></motion.p>
//       <section
//         style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
//         className="background"
//       ></section>
//       {dimensions.width > 0 && <SVG width={dimensions.width} height={dimensions.height} />}
//       {children}
//     </motion.section>
//   );
// };

// interface SVGProps {
//   width: number;
//   height: number;
// }

// const SVG: FC<SVGProps> = ({ width, height }) => {
//     const initialPath = `
//     M 0 0
//     L ${width} 0
//     L ${width} ${height}
//     L 0 ${height}
//     Z
// `

//   const targetPath = `
//     M 0 0
//     L ${width} 0
//     L ${width} ${height}
//     L 0 ${height}
//     Z
// `
// ;

//   const curve = {
//     initial: { d: initialPath},
//     enter: {
//       d: targetPath,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//     exit: {
//       d: initialPath,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   const slide = {
//     initial: { top: '0px', zIndex: 51 },
//     enter: {
//       top: '-100vh',
//       transition: {
//         duration: 1,
//         delay: 3,
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '100vh',
//         zIndex: 'auto',
//       },
//     },
//     exit: {
//       top: '0px',
//       zIndex: 51,
//       transition: {
//         duration: 1,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   return (
//     <motion.svg {...anim(slide)}>
//       <motion.path {...anim(curve)} fill="#0f0f0f" />
//     </motion.svg>
//   );
// };

// export default Curve;
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './layout.scss'

interface CurveProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

interface Dimensions {
  width: number;
  height: number;
}

const anim = (variants: any) => ({
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants,
});

const Curve: FC<CurveProps> = ({ children, backgroundColor }) => {
  const location = useLocation();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper') as HTMLElement | null;
    if (wrapper) {
      // Добавляем класс wrapper при начале анимации
      wrapper.classList.add('wrapper');
      wrapper.classList.remove('wrapper-none-scroll');

      // Устанавливаем таймер для смены класса через 3 секунды
      const timer = setTimeout(() => {
        if (wrapper) {
          wrapper.classList.remove('wrapper');
          wrapper.classList.add('wrapper-none-scroll');
        }
      }, 3000);

      // Очищаем таймер при размонтировании компонента
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [location.pathname]);

  const text = {
    initial: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    enter: {
      opacity: 0,
      top: '-100px',
      transition: {
        duration: 0.9,
        delay: 3, // Задержка начала анимации текста
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: '58%',
        pointerEvents: 'none',
      },
    },
    exit: {
      opacity: 1,
      top: '50%',
      transition: {
        duration: 0.9,
        delay: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const svgSlide = {
    initial: { top: '0px', zIndex: 51 },
    enter: {
      top: '-100vh',
      transition: {
        duration: 1,
        delay: 3, // Задержка начала анимации SVG
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: '100vh',
        zIndex: 'auto',
      },
    },
    exit: {
      top: '0px',
      zIndex: 51,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const svgCurve = {
    initial: { d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z` },
    enter: {
      d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.section
      className="SectionPage"
      style={{ backgroundColor }}
      key={location.pathname}
    >
      <motion.p {...anim(text)} className="loadingText">
        Starflow Design<span className="labelc">©</span>
      </motion.p>
      <section
        style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
        className="background"
      ></section>
      {dimensions.width > 0 && (
        <motion.svg {...anim(svgSlide)}>
          <motion.path {...anim(svgCurve)} fill="#0f0f0f" />
        </motion.svg>
      )}
      {children}
    </motion.section>
  );
};

export default Curve;