import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { FC, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Footer, Navbar } from './components'
import CustomCursor from './components/customCursor/CustomCursor'
import Page404 from './pages/404/404'
import About from './pages/about/About'
import Contacts from './pages/contacts/Contacts'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Services from './pages/services/Services'
import './styles/default.scss'
import './styles/variables.scss'

const App: FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: FC = () => {
    const location = useLocation();

    // Initialize Lenis only if the current page is not in the pagesWithoutLenis array
    useEffect(() => {
            const lenis = new Lenis({
                duration: 1.3,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
                orientation: "vertical", // vertical, horizontal
                gestureOrientation: "vertical", // vertical, horizontal, both
                smoothWheel: true,
                wheelMultiplier: 1,
                syncTouch: false,
                touchMultiplier: 1,
                infinite: false
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                lenis.destroy();
            };
    }, []);

    // Array route with no video
    const pagesWithoutVideo = ['/projects', '/services', '/about'];
    // Check needed video
    const isVideoPage = !pagesWithoutVideo.includes(location.pathname);

    // Determine if the current page is the about page
    const isAboutPage = location.pathname === '/about';

    const projects = ['/projects'];
    const isCustomCursor = projects.includes(location.pathname);

    return (
            <section className="wrapper">
                {isCustomCursor && (
                     <CustomCursor />
                )}
                {isVideoPage && (
                    <video autoPlay muted loop playsInline className="video-bg">
                        <source src="back.mp4" type="video/mp4" />
                    </video>
                )}
                <section className="navbar">
                    <Navbar isAboutPage={isAboutPage} />
                </section>
                <section className="content">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/404" element={<Page404 />} />
                                <Route path="*" element={<Page404 />} />
                        </Routes>
                    </AnimatePresence>
                </section>
                <section className="footer">
                    <Footer />
                </section>
            </section>
    );
};

export default App;