import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import './layout.scss'

interface CurveProps {
  children: React.ReactNode;
  animationKey: string; // Избегаем коллизии с React key
}

interface Dimensions {
  height: number;
  width: number;
}

const anim = (variants: any) => ({
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants,
});

const Curve: FC<CurveProps> = ({ children, animationKey }) => {
  const [dimensions, setDimensions] = useState<Dimensions>({ height: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const bodyRef = useRef<HTMLBodyElement>(document.body as HTMLBodyElement);

  useEffect(() => {
    const resize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    resize();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    // Управление прокруткой
    if (isAnimating) {
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    } else {
      document.body.style.overflow = ''; // Разрешаем прокрутку
    }

    return () => {
      document.body.style.overflow = ''; // Сбрасываем стиль после размонтирования компонента
    };
  }, [isAnimating]);

  const text = {
    initial: { opacity: 1, pointerEvents: 'auto' },
    enter: {
      opacity: 0,
      top: '-100px',
      transition: {
        duration: 0.9,
        delay: 3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: { top: '50%', pointerEvents: 'none' },
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

  const handleAnimationComplete = () => setIsAnimating(false);

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      <motion.section
        key={animationKey}
        className="SectionPage"
        onAnimationComplete={handleAnimationComplete}>
        <motion.p {...anim(text)} className="loadingText">
          Starflow Design<span className="labelc">©</span>
        </motion.p>
        <section
          style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
          className="background">
        </section>
        {dimensions.width > 0 && (
          <SVG width={dimensions.width} height={dimensions.height} />
        )}
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

interface SVGProps {
  width: number;
  height: number;
}

const SVG: FC<SVGProps> = ({ width, height }) => {
  const initialPath = `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;
  const targetPath = `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;

  const curve = {
    initial: { d: initialPath, zIndex: 51 },
    enter: {
      d: targetPath,
      zIndex: 51,
      transition: {
        duration: 0.1,
        delay: 0,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: { zIndex: 'auto' },
    },
    exit: {
      d: initialPath,
      zIndex: 51,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: { zIndex: 'auto' },
    },
  };

  const slide = {
    initial: { top: '0px', zIndex: 51 },
    enter: {
      top: '-100vh',
      transition: {
        duration: 1,
        delay: 3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: { top: '100vh', zIndex: 'auto' },
    },
    exit: {
      top: '0px',
      zIndex: 51,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    transitionEnd: { zIndex: 'auto' },
  };

  return (
    <motion.svg {...anim(slide)}>
      <motion.path {...anim(curve)} fill="#0f0f0f" />
    </motion.svg>
  );
};

export default Curve;
