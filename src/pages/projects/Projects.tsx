import {
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
        first: "Rеal",
        second: " Estatе",
        order: "00-1",
        link: "https://dprofile.ru/case/76591/real-estate"
    },
    {
        id: 2,
        src: "/SF_STORE.jpg",
        first: "SF —",
        second: " Storе",
        order: "00-2",
        link: "https://dprofile.ru/case/55727/perfume-shop"
    },
    {
        id: 3,
        src: "/DETAILING_STUDIO.jpg",
        first: "Dеtailing",
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
    const y = useParallax(scrollYProgress, 0); // just for using

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
                transform: `translateY(${y.get()}px)` // just for using 
            }}
        />
    );
};

const Projects: React.FC = () => {
    const [currentProject, setCurrentProject] = useState(projects[0]);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);

    // animation on text during scroll
    // useEffect(() => {
    //     const initAnimations = () => {
    //         const elements = [];
    //         if (h1Ref.current) elements.push(h1Ref.current);
    //         if (pRef.current) elements.push(pRef.current);

    //         elements.forEach(element => {

    //             Splitting({ 
    //                 target: element, 
    //                 by: 'chars', 
    //                 key: null 
    //             });
    //             element.classList.remove('visible');
                
    //             Splitting({ 
    //                 target: element, 
    //                 by: 'chars' 
    //             });
                
    //             setTimeout(() => {
    //                 element.classList.add('visible');
    //             }, 50);
    //         });
    //     };

    //     initAnimations();
    // }, [currentProject]);
    useEffect(() => {
        const initAnimation = (element: HTMLElement) => {
            // Сбрасываем предыдущее состояние
            const originalContent = element.dataset.originalContent || element.innerHTML;
            element.innerHTML = originalContent;
            element.classList.remove('visible');
            
            // Сохраняем оригинальный контент
            element.dataset.originalContent = originalContent;
            
            // Применяем Splitting
            Splitting({ target: element, by: 'chars' });
            
            // Активируем анимацию
            setTimeout(() => {
                element.classList.add('visible');
            }, 50);
        };

        if (h1Ref.current) initAnimation(h1Ref.current);
        if (pRef.current) initAnimation(pRef.current);
    }, [currentProject]);

    const handleProjectVisible = (id: number) => {
        setCurrentProject(projects.find(p => p.id === id) || projects[0]);
    };

    return (
        <main className="projects-container">
            <section className='mainText'>
                {/* <p 
                // key={currentProject.id} 
                ref={pRef} 
                className='order' 
                data-splitting
                >
                    {currentProject.order} */}
                    {/* <span className="divider"></span> 
                    00-3 */}
                {/* </p> */}
                <p 
                    ref={pRef} 
                    className="order" 
                    data-splitting
                >  
                    {currentProject.order}   
                </p>
                <h1
                    key={currentProject.id}
                    ref={h1Ref}
                    className="slide-vertical"
                    data-splitting
                >
                    <span className='firText'>{currentProject.first}</span>
                    <span className='secText'>{currentProject.second}</span>
                </h1>
                <Link
                    className='goProject'
                    to={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>
                        <img className='leftArrow' src={arrowLeft} alt='arrow' />
                        СМОТРЕТЬ КЕЙС
                        <img className='rightArrow' src={arrowRight} alt='arrow' />
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