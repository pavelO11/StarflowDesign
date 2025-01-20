import {
    motion,
    MotionValue,
    useScroll,
    useTransform
} from "framer-motion"
import { useRef } from "react"
import { Link } from 'react-router-dom'
import useSplittingHover from '../../components/hooks/useSplittingHover'
import './projects.scss'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'
  
  const projects = [
    {
      src: "/REAL_ESTATE.jpg",
      first: "Real",
      second: " Estate",
      alt: "Image"
    },
    {
      src: "/SF_STORE.jpg",
      first: "SF",
      second: " Store",
      alt: "Image"
    },
    {
      src: "/DETAILING_STUDIO.jpg",
      first: "Detailing",
      second: " Studio",
      alt: "Image"
    }
  ];
  
  // parallax hook
  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  
  const ParallaxImage: React.FC<{ src: string; first: string; second: string; alt: string }> = ({ src, first, second, alt }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 1);
    useSplittingHover();
    return (
      <section className="image-section">
        <div ref={ref} className="image-container">
          <motion.img src={src} alt={alt} className="image" style={{ y }} />
          <section className='mainText'>
            <p>00-1 <span></span> 00-3</p>
            <h1 className="slide-vertical">
              <span className='firText'>{first}</span>
              <span className='secText'>{second}</span>
            </h1>
            <Link
              data-splitting
              to="#"
              target="_blank"
              rel="noopener noreferrer"
              className='goProject'
            >
              <div>
                <img className='leftArrow' src={arrowLeft} alt='arrow' />СМОТРЕТЬ КЕЙС<img className='rightArrow' src={arrowRight} alt='arrow' />
              </div>
            </Link>
          </section>
        </div>
      </section>
    );
  };
  
  const Projects: React.FC = () => {
    return (
      <main className="projects-container">
        {projects.map((project, index) => (
          <ParallaxImage 
            key={index} 
            src={project.src} 
            first={project.first} 
            second={project.second} 
            alt={project.alt} 
          />
        ))}
      </main>
    );
  };
  
  export default Projects;