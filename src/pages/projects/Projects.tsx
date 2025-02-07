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
        first: "Real",
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
        first: "Detailing",
        second: " Studiо",
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
    const { scrollYProgress } = useScroll({ 
        target: ref,
    });
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
    // const h1Ref = useRef<HTMLHeadingElement>(null);
    // const pRef = useRef<HTMLParagraphElement>(null);
    const h1RefDesktop = useRef<HTMLHeadingElement>(null);
    const pRefDesktop = useRef<HTMLParagraphElement>(null);
    const h1RefMobile = useRef<HTMLHeadingElement>(null);
    const pRefMobile = useRef<HTMLParagraphElement>(null);

    // animation on text during scroll
    useEffect(() => {
        const initAnimation = (element: HTMLElement) => {
            // Сбрасываем предыдущее состояние
            const originalContent = element.dataset.originalContent || element.innerHTML;
            element.innerHTML = originalContent;
            element.classList.remove('visible');
            
            // Сохраняем оригинальный контент
            element.dataset.originalContent = originalContent;
            
            // Применяем Splitting
            Splitting({ target: element, by: 'chars', ignore: '.static-text' });
            
            // Активируем анимацию
            setTimeout(() => {
                element.classList.add('visible');
            }, 50);
        };

        if (window.innerWidth > 768) {
            if (h1RefDesktop.current) initAnimation(h1RefDesktop.current);
            if (pRefDesktop.current) initAnimation(pRefDesktop.current);
        } else {
            if (h1RefMobile.current) initAnimation(h1RefMobile.current);
            if (pRefMobile.current) initAnimation(pRefMobile.current);
        }

    }, [currentProject]);

    const handleProjectVisible = (id: number) => {
        setCurrentProject(projects.find(p => p.id === id) || projects[0]);
    };

    return (
        <main className="projects-container">
            <section className='mainTextMobile'>
                    <h1
                        key={currentProject.id}
                        ref={h1RefMobile}
                        className="slide-vertical"
                        data-splitting
                    >
                        <span className='firText'>{currentProject.first}</span>
                        <span className='secText'>{currentProject.second}</span>
                    </h1>
                    <div className='underMobile'>
                        <div className='countProjects'>
                        <p
                            key={currentProject.order}
                            ref={pRefMobile} 
                            className="order" 
                            data-splitting
                        >  
                            {currentProject.order}
                            <span className="divider"></span> 
                        </p>
                        <p>00-3</p>
                        </div>
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
                    </div>
            </section>
            <section className='mainText'>
                <div className='countProjects'>
                <p
                    key={currentProject.order}
                    ref={pRefDesktop} 
                    className="order" 
                    data-splitting
                >  
                    {currentProject.order}
                    <span className="divider"></span> 
                </p>
                <p>00-3</p>
                </div>
                <h1
                    key={currentProject.id}
                    ref={h1RefDesktop}
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