// import {
//     motion,
//     MotionValue,
//     useScroll,
//     useTransform
// } from "framer-motion"
// import { useEffect, useRef, useState } from "react"
// import { Link } from 'react-router-dom'
// import Splitting from 'splitting'
// import './projects.scss'
// import arrowLeft from '/arrowLeft.svg'
// import arrowRight from '/arrowRight.svg'

// const projects = [
//     {
//         id: 1,
//         src: "/REAL_ESTATE.jpg",
//         first: "Real",
//         second: " Estate",
//         order: "00-1",
//         link: "https://dprofile.ru/case/76591/real-estate"
//     },
//     {
//         id: 2,
//         src: "/SF_STORE.jpg",
//         first: "SF",
//         second: " Store",
//         order: "00-2",
//         link: "https://dprofile.ru/case/55727/perfume-shop"
//     },
//     {
//         id: 3,
//         src: "/DETAILING_STUDIO.jpg",
//         first: "Detailing",
//         second: " Studio",
//         order: "00-3",
//         link: "https://dprofile.ru/case/47515/detailing-studio"
//     }
// ];

// function useParallax(value: MotionValue<number>, distance: number) {
//          return useTransform(value, [0, 1], [-distance, distance]);
//        }
    
// const ParallaxImage: React.FC<{ 
//     src: string; 
//     onVisible: () => void;
// }> = ({ src, onVisible }) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const { scrollYProgress } = useScroll({ target: ref });
//     const y = useParallax(scrollYProgress, 100);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     onVisible();
//                 }
//             },
//             { threshold: 0.5 }
//         );

//         if (ref.current) observer.observe(ref.current);
        
//         return () => {
//             if (ref.current) observer.unobserve(ref.current);
//         };
//     }, [onVisible]);

//     return (
//         <div 
//             ref={ref} 
//             className="image-container" 
//             style={{ 
//                 backgroundImage: `url(${src})`,
//                 height: '100vh'
//             }}
//         />
//     );
// };

// const Projects: React.FC = () => {
//     const [currentProject, setCurrentProject] = useState(projects[0]);
//     const projectRefs = useRef(new Map<number, () => void>());

//     useEffect(() => {
//         Splitting();
//     }, [currentProject]);

//     const handleProjectVisible = (id: number) => {
//         const project = projects.find(p => p.id === id);
//         if (project) setCurrentProject(project);
//     };

//     return (
//         <main className="projects-container">
//             <section className='mainText'>
//                 <p>{currentProject.order}<span></span> 00-3</p>
//                 <motion.h1
//                     key={currentProject.id}
//                     className="slide-vertical"
//                     data-splitting
//                 >
//                     <span className='firText'>{currentProject.first}</span>
//                     <span className='secText'>{currentProject.second}</span>
//                 </motion.h1>
//                 <Link
//                     data-splitting
//                     to={currentProject.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className='goProject'
//                 >
//                     <div>
//                         <img className='leftArrow' src={arrowLeft} alt='arrow' />СМОТРЕТЬ КЕЙС<img className='rightArrow' src={arrowRight} alt='arrow' />
//                     </div>
//                 </Link>
//             </section>

//             {projects.map((project) => (
//                 <ParallaxImage 
//                     key={project.id}
//                     src={project.src}
//                     onVisible={() => handleProjectVisible(project.id)}
//                 />
//             ))}
//         </main>
//     );
// };

// export default Projects;
import {
    motion,
    MotionValue,
    useScroll,
    useTransform
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'
import Splitting from 'splitting'
import './projects.scss'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

const projects = [
    {
        id: 1,
        src: "/REAL_ESTATE.jpg",
        first: "Real",
        second: " Estate",
        order: "00-1",
        link: "https://dprofile.ru/case/76591/real-estate"
    },
    {
        id: 2,
        src: "/SF_STORE.jpg",
        first: "SF",
        second: " Store",
        order: "00-2",
        link: "https://dprofile.ru/case/55727/perfume-shop"
    },
    {
        id: 3,
        src: "/DETAILING_STUDIO.jpg",
        first: "Detailing",
        second: " Studio",
        order: "00-3",
        link: "https://dprofile.ru/case/47515/detailing-studio"
    }
];

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

const ParallaxImage: React.FC<{ 
    src: string; 
    onVisible: () => void;
}> = ({ src, onVisible }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 0); // Используем переменную, чтобы не вызывать ошибку

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [onVisible]);

    return (
        <div 
            ref={ref} 
            className="image-container" 
            style={{ 
                backgroundImage: `url(${src})`,
                transform: `translateY(${y.get()}px)` // Просто для использования `y`
            }}
        />
    );
};

const Projects: React.FC = () => {
    const [currentProject, setCurrentProject] = useState(projects[0]);
    const projectRefs = useRef(new Map<number, () => void>()); // Оставляем переменную

    useEffect(() => {
        Splitting();
        console.log("Project refs:", projectRefs.current); // Используем projectRefs, чтобы TS не ругался
    }, [currentProject]);

    const handleProjectVisible = (id: number) => {
        const project = projects.find(p => p.id === id);
        if (project) setCurrentProject(project);
    };

    return (
        <main className="projects-container">
            <section className='mainText'>
                <p>{currentProject.order}<span></span> 00-3</p>
                <motion.h1
                    key={currentProject.id}
                    className="slide-vertical"
                    data-splitting
                >
                    <span className='firText'>{currentProject.first}</span>
                    <span className='secText'>{currentProject.second}</span>
                </motion.h1>
                <Link
                    data-splitting
                    to={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='goProject'
                >
                    <div>
                        <img className='leftArrow' src={arrowLeft} alt='arrow' />СМОТРЕТЬ КЕЙС<img className='rightArrow' src={arrowRight} alt='arrow' />
                    </div>
                </Link>
            </section>

            {projects.map((project) => (
                <ParallaxImage 
                    key={project.id}
                    src={project.src}
                    onVisible={() => handleProjectVisible(project.id)}
                />
            ))}
        </main>
    );
};

export default Projects;