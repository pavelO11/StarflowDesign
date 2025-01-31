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
      id: 1,
      src: "/REAL_ESTATE.jpg",
      first: "Real",
      second: " Estate",
      alt: "Real Estate Project",
      order: "00-1"
    },
    {
      id: 2,
      src: "/SF_STORE.jpg",
      first: "SF",
      second: " Store",
      alt: "SF Store Project",
      order: "00-2"
    },
    {
      id: 3,
      src: "/DETAILING_STUDIO.jpg",
      first: "Detailing",
      second: " Studio",
      alt: "Detailing Studio Project",
      order: "00-3"
    }
  ];

  // parallax hook
  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  
  const ParallaxImage: React.FC<{ src: string; first: string; second: string; alt: string, order: string }> = ({ src, first, second, alt, order }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 0);
    useSplittingHover();
    return (
    //   <section className="image-section">
        <div ref={ref} className="image-container">
          <motion.img src={src} alt={alt} className="image" style={{ y }} />
          <section className='mainText'>
            <p>{order}<span></span> 00-3</p>
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
    //   </section>
    );
  };
  
  const Projects: React.FC = () => {
    return (
      <main className="projects-container">
        {projects.map((project) => (
        <ParallaxImage 
          key={project.id}
          src={project.src}
          first={project.first} 
          second={project.second}
          alt={project.alt}
          order={project.order}
        />
      ))}
      </main>
    );
  };
  
  export default Projects;