import React, { useEffect, useState } from 'react'
import ParallaxText from '../animations/velocity'
import FooterPrinciples from '../footer/footerPrinciples/FooterPrinciples'
import useScrollLock from '../hooks/useScrollLock'
import Navbar from '../navbar/Navbar'
import './principles.scss'

interface PrinciplesProps {
    handlePrinciplesShow: () => void;
}

const Principles: React.FC<PrinciplesProps> = ({ handlePrinciplesShow }) => {
    const [isVisible, setIsVisible] = useState(false);

    useScrollLock();

    useEffect(() => {
        setIsVisible(true); // starting animation when component is mounted
    }, []);

    const handleClose = () => {
        setIsVisible(false); // starting animation disappear
        setTimeout(() => {
            handlePrinciplesShow(); // callback after the animation is complete
        }, 700); // the time is the same as the duration of the animation in CSS
    };

    const isAboutPage = location.pathname === '/about';

    return (
        <section className={`principlesSection ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
            <Navbar isAboutPage={isAboutPage} />
            <section className='principlesShow'>
                <section className='marquee'>
                    <ParallaxText baseVelocity={-5}>Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика / Современность / Удобство / Понятность / Эстетика</ParallaxText>
                    <span className='principlesLine'></span>
                    <ParallaxText baseVelocity={5}>Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество / Новизна / Эффективность / Эмпатия / Качество /</ParallaxText>
                    <span className='principlesLine'></span>
                    <ParallaxText baseVelocity={-5}>Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность / Результат / Чистота / Эмоция / Функциональность</ParallaxText>
                </section>
            </section>
            <FooterPrinciples handlePrinciplesShow={handleClose} />
        </section>
    );
};

export default Principles;