import React from 'react'
import './timerContent.scss'
import arrowLeft from '/arrowBlackL.svg'
import arrowRight from '/arrowBlackR.svg'

interface TimerContentProps {
    ref: React.RefObject<HTMLElement>;
    handleDrawerClose: () => void;
    remainingTime: number;
}

const TimerContent: React.FC<TimerContentProps> = ({ ref, handleDrawerClose, remainingTime }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <article className='drawerThird' ref={ref}>
            <header>
                <p className='popupTextThird'>Пожалуйста, подождите,<br />пока закончится таймер</p>
            </header>
            <main>
                <p className='timer'>
                    {remainingTime > 0 ? formatTime(remainingTime) : '00:00'}
                </p>
                {remainingTime === 0 && <p>Таймер завершился!</p>}
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