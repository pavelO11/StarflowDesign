import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import useSplittingOnLoad from '../../components/hooks/useSplittingOnLoad'
import Curve from '../../components/layoutTransition'
import Navigation from '../../components/navigation/Navigation'
import './projects.scss'

import { useEffect, useState } from 'react'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

const Projects: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false); // fade first loading

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 4800); // delay
    }, []);

    useSplittingOnLoad('.slide-vertical');

    return (
        <Curve>
            <Helmet>
                <title>Starflow Design - Портфолио</title>
                <meta
                    name="description"
                    content="Ознакомьтесь с избранными работами Игоря Дубовцева, демонстрирующими опыт в UX & UI дизайне. Откройте для себя проекты, сочетающие эстетику, удобство и смыслы, направленные на усиление бизнеса."
                />
            </Helmet>
            <main className="projects-container">
                <>
                <Link
                    to="https://dprofile.ru/case/76591/real-estate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/REAL_ESTATE.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Real</span>
                                <span className="secText"> Estate</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Real</span>
                                <span className="secText"> Estate</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/76591/real-estate"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                        <Navigation />
                    </section>
                </Link>

                <Link
                    to="https://dprofile.ru/case/55727/perfume-shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/SF_STORE.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">SF —</span>
                                <span className="secText"> Store</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">SF —</span>
                                <span className="secText"> Store</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/55727/perfume-shop"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                    </section>
                </Link>

                <Link
                    to="https://dprofile.ru/case/47515/detailing-studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/DETAILING_STUDIO.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Detailing</span>
                                <span className="secText"> Studio</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Detailing</span>
                                <span className="secText"> Studio</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/47515/detailing-studio"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                    </section>
                </Link>
                </>
            </main>
        </Curve>
    );
};

export default Projects;