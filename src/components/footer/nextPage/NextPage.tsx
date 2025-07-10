import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSplittingHover from '../../hooks/useSplittingHover'
import { useNextPageContext } from './NextPageContextType'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

function NextPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, setTitle, delayTitle, setDelayTitle } = useNextPageContext();
    const currentPage = location.pathname;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function getNextPage() {
        switch (currentPage) {
            case '/projects':
                return '/services';
            case '/services':
                return '/about';
            case '/about':
                return '/contacts';
            default:
                return '/';
        }
    }

    function getNextPageTitle(path = getNextPage()) {
        switch (path) {
            case '/services':
                return 'Услуги';
            case '/about':
                return 'Обо мне';
            case '/contacts':
                return 'Контакты';
            default:
                return '';
        }
    }

    useSplittingHover();

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        // Устанавливаем флаг задержки в контексте - он сохранится при переходе
        setDelayTitle(true);
        // Переходим на следующую страницу немедленно
        navigate(getNextPage());
    }

    useEffect(() => {
        // Очищаем предыдущий таймер, если он был
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (delayTitle) {
            // Если установлен флаг задержки, показываем заголовок через 2 секунды
            timeoutRef.current = setTimeout(() => {
                setTitle(getNextPageTitle());
                setDelayTitle(false); // Сбрасываем флаг задержки
            }, 2000);
        } else {
            // Если это обычная загрузка страницы, устанавливаем заголовок сразу
            setTitle(getNextPageTitle());
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [location.pathname, delayTitle, setTitle, setDelayTitle]);

    return (
        <a
            data-splitting
            href={getNextPage()}
            className="nextPage"
            onClick={handleClick}
        >
            <p style={{ fontSize: '80px' }}>{title}</p>
            <section className="nextPageLink">
                <img className="leftArrow" src={arrowLeft} alt="arrow" />
                Следующая страница
                <img className="rightArrow" src={arrowRight} alt="arrow" />
            </section>
        </a>
    );
}

export default NextPage;