// import './projects.scss'

// import {
//     motion,
//     MotionValue,
//     useScroll,
//     useTransform
// } from "framer-motion"
// import { useRef } from "react"

// const Projects: React.FC = () => {

// function useParallax(value: MotionValue<number>, distance: number) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

// function Image({ id }: { id: number }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useParallax(scrollYProgress, 3);

//   const images = [
//     { id: '1', src: '/project1.svg' },
//     { id: '2', src: '/project2.svg' },
//     { id: '3', src: '/project3.svg' },
//   ];

//   return (
//     <>
//       <div ref={ref}>
//         {images.map((image) => (
//             <img alt='image' src={image.src} />
//         ))}
//       </div>
//       <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
//     </>
//   );
// }

//     return (
//         <section className='projectSection'>
//             <Image id={0} />
//         </section>
//     );
// }

// export default Projects;
import './projects.css'

import {
    motion,
    MotionValue,
    useScroll,
    useTransform
} from "framer-motion"
import { useRef } from "react"

// Хук для параллакса
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Компонент для одного изображения
const ParallaxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref }); // Связь со скроллом секции
  const y = useParallax(scrollYProgress, 300); // Параллакс для этого изображения

  return (
    <section className="image-section">
      <div ref={ref} className="image-container">
        <motion.img src={src} alt={alt} className="image" style={{ y }} />
      </div>
      <motion.h2 className="parallax-text" style={{ y }}>
        {alt}
      </motion.h2>
    </section>
  );
};

// Основной компонент
const Projects: React.FC = () => {
  return (
    <main className="projects-container">
      {/* Добавляем изображения */}
      <ParallaxImage src="/project1.svg" alt="Project 1" />
      <ParallaxImage src="/project2.svg" alt="Project 2" />
      <ParallaxImage src="/project3.svg" alt="Project 3" />
    </main>
  );
};

export default Projects;