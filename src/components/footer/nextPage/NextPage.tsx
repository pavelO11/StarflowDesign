import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSplittingHover from '../../hooks/useSplittingHover'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

function NextPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = location.pathname;

    const [nextPageTitle, setNextPageTitle] = useState(getNextPageTitle()); // text state

    function getNextPage() {
        switch (currentPage) {
            case '/projects':
                return '/services';
            case '/services':
                return '/about';
            case '/about':
                return '/contacts';
            default:
                return '/'; // if current page undefined => home
        }
    }

    function getNextPageTitle() {
        switch (getNextPage()) {
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
        const nextPage = getNextPage();

        setTimeout(() => {
            setNextPageTitle(getNextPageTitle());
        }, 2000);

        navigate(nextPage);
    }

    return (
        <a
            data-splitting
            href={getNextPage()}
            className="nextPage"
            onClick={handleClick}
        >
            <p style={{ fontSize: '80px' }}>{nextPageTitle}</p>
            <section className="nextPageLink">
                <img className="leftArrow" src={arrowLeft} alt="arrow" />
                Следующая страница
                <img className="rightArrow" src={arrowRight} alt="arrow" />
            </section>
        </a>
    );
}

export default NextPage;