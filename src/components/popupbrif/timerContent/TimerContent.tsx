import React from 'react'
import './timercontent.scss'
import arrowLeft from '/arrowBlackL.svg'
import arrowRight from '/arrowBlackR.svg'

interface TimerContentProps {
    ref: React.RefObject<HTMLElement>;
    handleDrawerClose: () => void;
    remainingTime: number;
}

const TimerContent: React.FC<TimerContentProps> = ({ ref, handleDrawerClose, remainingTime }) => {
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <article className='drawerThird' ref={ref}>
            <header>
                <p className='popupTextThird'>Пожалуйста, подождите,<br />пока закончится таймер</p>
            </header>
            <main>
                <p className='timer'>{formatTime(remainingTime)}</p>
            </main>
            <footer>
                <p className='footerFormText'>После завершения отсчета, Вы<br />снова сможете заполнить бриф</p>
                <button onClick={handleDrawerClose} className='closeButton2'>
                    <img className='leftArrow' src={arrowLeft} alt='arrow' />Закрыть<img className='rightArrow' src={arrowRight} alt='arrow' />
                </button>
            </footer>
        </article>
    );
};

export default TimerContent;