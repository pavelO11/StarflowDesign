import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

import './services.scss'

import { AnimatePresence } from 'framer-motion'
import Splitting from 'splitting'
import AboutMe from '../../components/aboutMe/AboutMe'
import { usePageRefresh, usePageRefreshing } from '../../components/context/PageRefreshContext'
import useBodyScrollLock from '../../components/hooks/useScrollLock'
import useSplittingHover from '../../components/hooks/useSplittingHover'
import useSplittingOnLoad from '../../components/hooks/useSplittingOnLoad'
import Curve from '../../components/layoutTransition'
import NavigationButtons from '../../components/navigation/Navigation'
import PopupBrif from '../../components/popupbrif/PopupBrif'

const Services = () => {
  const [brifOpened, setBrifOpened] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const isPageRefresh = usePageRefresh();
  const isPageRefreshing = usePageRefreshing();

    useEffect(() => {
    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 428);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);

  const handleOpenPopup = (id: string) => {
    setSelectedService(id);
    setBrifOpened(true);
  };

  const handleToggleAccordion = (index: number) => {
	setAccordionStates(prevState =>
	  prevState.map((isOpen, i) => (i === index ? !isOpen : false))
	);
  };

  const myServices = [
    { id: '1', number: '01', title: 'Одностраничный сайт', description: 'Сайт для компаний, которым нужно протестировать гипотезу, продукт или создать сайт-визитку. ', price: '70 000', deadlines: '5' },
    { id: '2', number: '02', title: 'Корпоративный сайт', description: 'Сайт для бизнесов, которым нужно более подробно рассказать о себе, продукте, услугах, команде.', price: '100 000', deadlines: '14' },
    { id: '3', number: '03', title: 'Интернет-магазин', description: 'Сайт для продажи товаров с онлайн-оплатой, доставкой и управлением каталогами.', price: '120 000', deadlines: '14' },
    { id: '4', number: '04', title: 'Дизайн в Figma', description: 'Полноценный дизайн-макет сайта, подготовленный к верстке + дизайнерский контроль.', price: '50 000', deadlines: '5' }
  ];

  const topRefs = useRef<(HTMLDivElement | null)[]>([]); // To hold refs for all top sections
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const heights = topRefs.current.map(ref => ref?.offsetHeight || 0); // Get heights of all refs
    const newMaxHeight = Math.max(...heights); // Find the maximum height
    setMaxHeight(newMaxHeight); // Update state with the maximum height
  }, [myServices]);

  const stages = [
    { id: '1', number: '01', title: 'Знакомство и бриф', description: ['Созвонимся, познакомимся и обсудим детали проекта,', 'чтобы я мог оценить стоимость и сроки.'],  description2: 'Созвонимся, познакомимся и обсудим детали проекта, чтобы я мог оценить стоимость и сроки.' , time: 'Займет 20-30 минут' },
    { id: '2', number: '02', title: 'Анализ и структура', description: ['На этом этапе я изучаю целевую аудиторию, анализирую', 'рынок и конкурентов, составляю грамотную структуру,', 'чтобы предложить вам наиболее выигрышный вариант', 'реализации сайта'], description2: 'На этом этапе я изучаю целевую аудиторию, анализирую рынок и конкурентов, составляю грамотную структуру, чтобы предложить вам наиболее выигрышный вариант реализации сайта.', time: 'От 2-х дней' },
    { id: '3', number: '03', title: 'Референсы и прототип', description: ['Я собираю все ваши пожелания по сайту, подбираю', 'качественные референсы, которые мы вместе и', 'утверждаем. После чего переходим к созданию прототипа.'], description2: 'Я собираю все ваши пожелания по сайту, подбираю качественные референсы, которые мы вместе и утверждаем. После чего переходим к созданию прототипа.', time: 'От 2-х дней' },
    { id: '4', number: '04', title: 'Создание дизайн-концепции', description: ['Дизайню 1-3 ключевые страницы, в которых я', 'прорабатываю визуал будущего сайта. Этот этап помогает', 'найти общее виденье и создать грамотную концепцию.'], description2: 'Дизайню 1-3 ключевые страницы, в которых я прорабатываю визуал будущего сайта. Этот этап помогает, найти общее виденье и создать грамотную концепцию.',  time: 'От 3-х дней' },
    { id: '5', number: '05', title: 'Дизайн всего сайта и адаптивы', description: ['Отрисовываю весь сайт целиком, включая внутренние', 'страницы и их состояния в согласованном стиле. Рисую', 'адаптивные версии.'], description2: 'Отрисовываю весь сайт целиком, включая внутренние страницы и их состояния в согласованном стиле. Рисую адаптивные версии.',  time: 'От 4-х дней' },
    { id: '6', number: '06', title: 'Верстка и дизайнерский контроль', description: ['После согласования дизайна, мы переходим к верстке', 'и выбираем, каким способом будет реализован сайт.', 'Я контролирую весь процесс, чтобы все было именно так,', 'как мы задумали.'], description2: 'После согласования дизайна, мы переходим к верстке, и выбираем, каким способом будет реализован сайт. Я контролирую весь процесс, чтобы все было именно так, как мы задумали.', time: 'От 4-х дней' },
    { id: '7', number: '07', title: 'Передача готового сайта и поддержка', description: ['Передаю вам все доступы и файлы сайта.'], description2: 'Передаю вам все доступы и файлы сайта.',  time: '+1 месяц поддержки сайта' }
  ];

  const [accordionStates, setAccordionStates] = useState(
    stages.map(() => false)
  );

  useSplittingOnLoad('.slide-vertical');

  useSplittingHover();

  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  useEffect(() => {
    // Не запускаем анимацию пока идет прелоадер
    if (isPageRefreshing) return;

    Splitting({ target: '.homeText p' });

    // Динамические задержки в зависимости от типа загрузки
    const initialDelay = isPageRefresh ? 500 : 200; // delay for first string
    const subsequentDelay = 100; // delay beetween strings

    const lines = document.querySelectorAll('.servicesText p , .mobileText p');
    lines.forEach((_line, index) => {
      const delay = initialDelay + subsequentDelay * index;
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, delay);
    });
  }, [isPageRefresh, isPageRefreshing]);

  const aboutMeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;
    
    // Начальная настройка navbar
    navbar.style.mixBlendMode = 'normal';
    navbar.classList.add('mix-blend-normal');
    navbar.classList.remove('mix-blend-difference');
    
    // Создаем Intersection Observer для AboutMe
    const aboutMeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Когда AboutMe в поле зрения - включаем difference
          navbar.style.mixBlendMode = 'difference';
          navbar.classList.add('mix-blend-difference');
          navbar.classList.remove('mix-blend-normal');
        } else {
          // Когда AboutMe уходит из поля зрения - возвращаем normal
          navbar.style.mixBlendMode = 'normal';
          navbar.classList.add('mix-blend-normal');
          navbar.classList.remove('mix-blend-difference');
        }
      });
    }, { threshold: 0.1 }); // Реагировать, когда видно 10% элемента
    
    // Создаем Intersection Observer для Footer
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Когда Footer виден на 50% - включаем normal
          navbar.style.mixBlendMode = 'normal';
          navbar.classList.add('mix-blend-normal');
          navbar.classList.remove('mix-blend-difference');
        }
      });
    }, { threshold: 0.5 }); // Реагировать, когда видно 50% элемента
    
    // Начинаем отслеживание элементов
    if (aboutMeRef.current) {
      aboutMeObserver.observe(aboutMeRef.current);
    }
    
    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }
    
    // Очистка при размонтировании
    return () => {
      if (aboutMeRef.current) aboutMeObserver.unobserve(aboutMeRef.current);
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
      
      // Возвращаем navbar в нормальное состояние
      navbar.style.mixBlendMode = 'normal';
      navbar.classList.remove('mix-blend-difference');
      navbar.classList.add('mix-blend-normal');
    };
  }, []);

    useBodyScrollLock(brifOpened);

  return (
    <Curve>
    <>
        <Helmet>
          <title>Starflow Design — Услуги</title>
          <meta name="description" content="Дизайн, который улучшает имидж. Разработка сайта с акцентом на бизнес-задачи. Я верю в силу качественного дизайна и люблю сотрудничать с людьми, которые чувствуют также. Давайте работать вместе." />
        </Helmet>
        <AnimatePresence mode='wait'>
            {brifOpened && <PopupBrif selectedService={selectedService} opened={brifOpened} onClose={() => setBrifOpened(false)} />}
        </AnimatePresence>
      <section className='servicesSection'>
        <section className='servicesText'>
          <section>
            <p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
              <span className='char'>создаю продуманный дизайн,</span>
            </p>
            <p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
              <span className='char'>сочетающий в себе эмоцию,</span>
            </p>
            <p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
              <span className='char'>эстетику и удобство</span>
            </p>
          </section>
          <h1 data-splitting className='slide-vertical'><span className='firText'>Мои</span><span className='secText'> Услуги</span></h1>
          <section>
            <p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
              <span className='char'>к каждому проекту подхожу</span>
            </p>
            <p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
              <span className='char'>как к собственному, всегда</span>
            </p>
            <p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
              <span className='char'>выкладываюсь на  максимум</span>
            </p>
          </section>
        </section>
        <section className='servicesTextMobile'>
          <h1 data-splitting className='slide-vertical'><span className='firText'>Мои</span><span className='secText'> Услуги</span></h1>
          <section className='mobileText'>
            {/* <p>создаю продуманный дизайн,<br></br>сочетающий в себе эмоцию,<br></br>эстетику и удобство</p>
            <p>К каждому проекту подхожу<br></br>как к собственному, всегда<br></br>выкладываюсь на  максимум</p> */}
            <section>
            <p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
              <span className='char'>создаю продуманный дизайн,</span>
            </p>
            <p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
              <span className='char'>сочетающий в себе эмоцию,</span>
            </p>
            <p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
              <span className='char'>эстетику и удобство</span>
            </p>
          </section>
          <section>
            <p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
              <span className='char'>к каждому проекту подхожу</span>
            </p>
            <p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
              <span className='char'>как к собственному, всегда</span>
            </p>
            <p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
              <span className='char'>выкладываюсь на  максимум</span>
            </p>
          </section>
          </section>
        </section>
        <NavigationButtons />
        <main className='mainServices'>
          {myServices.map((services, index) => (
            <section key={services.id} className='service service-hover'>
              <section
                className='top'
                ref={el => topRefs.current[index] = el as HTMLDivElement} // Type assertion
                style={{ height: maxHeight ? `${maxHeight}px` : 'auto' }} // Set the height based on maxHeight
              >
                <p data-splitting className='number slide-vertical'>({services.number})</p>
                <h2 data-splitting className='title slide-vertical'>{services.title}</h2>
              </section>
              <button
                data-splitting
                onClick={() => handleOpenPopup(services.id)}
                className='serviceButton'>
                <section className='insideButton'><img className='leftArrow' src={arrowLeft} alt='arrow' />заказать<img className='rightArrow' src={arrowRight} alt='arrow' /></section>
              </button>
              <section className='bottom'>
                <p className='description'>{services.description}</p>
                <section className='timeValues'>
                  <p className='price'>от {services.price} ₽</p>
                  <p className='deadlines'>от {services.deadlines}-ти дней</p>
                </section>
              </section>
            </section>
          ))}
        </main>
        <div ref={aboutMeRef}>
          <AboutMe/>
        </div>
        <section className='serviceStages'>
          <p>( Этапы сотрудничества )</p>
          <ul className='accordion'>
            {stages.map((stage, index) => (
              <li key={stage.id} onClick={() => handleToggleAccordion(index)} className={accordionStates[index] ? 'open' : ''} style={{ borderBottom: accordionStates[index] ? '1px solid #FAFAFA' : '1px solid rgba(255, 255, 255, 0.2)' }}>
                <input
                    type='radio'
                    readOnly
                    name='accordion'
                    id={stage.id}
                    checked={accordionStates[index]}
            onClick={() => handleToggleAccordion(index)}
                />
                <label htmlFor={stage.id}>
                  <p>({stage.number})</p>
                  {stage.title}
                  <img src='accordionPlus.svg' alt='toggle' />
                </label>
                <section className='content'>
                {isMobileView 
                    ? <p className='description'>{stage.description2}</p>  // mobile string
                    : (Array.isArray(stage.description) 
                        ? stage.description.map((line, index) => (   // desktop array
                            <p key={index} className='description'>{line}</p>
                        ))
                        : <p className='description'>{stage.description}</p>  // if description not array, else show string
                    )
                }
                <p className='time'>{stage.time}</p>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
    </Curve>
  )
}
export default Services;