import { AnimatePresence } from 'framer-motion'
// import Lenis from 'lenis'
import { FC } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import Page404 from './pages/404/404'
import About from './pages/about/About'
import Contacts from './pages/contacts/Contacts'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Services from './pages/services/Services'
import './styles/default.scss'
import './styles/variables.scss'

import { Footer, Navbar } from './components'

const App: FC = () => {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

const AppContent: FC = () => {
  const location = useLocation();

  // useEffect(() => {
  //   // Lenis Animation onScroll
  //   const lenis = new Lenis({
  //     duration: 0.5,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(3, -10 * t)), // smooth settings
  //     // smoothWheel: true,
  //     // smoothTouch: true,
  //   });
  
  //   const handleScroll = (time: number) => {
  //     lenis.raf(time); // Вызов анимации прокрутки Lenis
  //     requestAnimationFrame(handleScroll);
  //   };
  
  //   requestAnimationFrame(handleScroll);
  
  //   return () => {
  //     lenis.destroy(); // clear Lenis
  //   };
  // }, []);

  const isVideoPage = ['/', '/contacts', '/404'].includes(location.pathname);

  return (
    <>
      <section className="wrapper">
        {isVideoPage && (
          <video autoPlay muted loop playsInline className="video-bg">
            <source src="back.mp4" type="video/mp4" />
          </video>
        )}
        <section className="navbar">
          <Navbar />
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
            </Routes>
          </AnimatePresence>
        </section>
        <section className="footer">
          <Footer />
        </section>
      </section>
    </>
  );
};

export default App;
