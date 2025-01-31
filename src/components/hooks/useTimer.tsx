// const useTimer = (duration: number) => {
//     const [remainingTime, setRemainingTime] = useState(duration);
//     const timerActive = useRef(false);
//     const startTimeRef = useRef<number | null>(null);
//     const timerIdRef = useRef<number | null>(null);

//     // Восстановление состояния таймера из localStorage
//     useEffect(() => {
//         const storedStartTime = localStorage.getItem('startTime');
//         if (storedStartTime) {
//             const startTime = parseInt(storedStartTime, 10);
//             startTimeRef.current = startTime;
//             const currentTime = Date.now();
//             const elapsed = currentTime - startTime;
//             const remaining = duration - elapsed;
//             // В useEffect восстановления добавить:
//             if (remaining > 0) {
//                 setRemainingTime(remaining);
//                 timerActive.current = true;
//                 startTimer(); // Явно запустить таймер
//             } else {
//                 setRemainingTime(0);
//                 localStorage.removeItem('startTime');
//             }
//         }
//     }, [duration]);

//     // Обработка интервала
//     useEffect(() => {
//         if (timerActive.current) {
//             timerIdRef.current = window.setInterval(() => {
//                 if (startTimeRef.current !== null) {
//                     const currentTime = Date.now();
//                     const elapsed = currentTime - startTimeRef.current;
//                     const remaining = duration - elapsed;
//                     if (remaining > 0) {
//                         setRemainingTime(remaining);
//                         localStorage.setItem('elapsedTime', elapsed.toString());
//                     } else {
//                         setRemainingTime(0);
//                         stopTimer();
//                     }
//                 }
//             }, 1000);
//         } else if (timerIdRef.current !== null) {
//             clearInterval(timerIdRef.current);
//             timerIdRef.current = null;
//         }

//         return () => {
//             if (timerIdRef.current !== null) {
//                 clearInterval(timerIdRef.current);
//                 timerIdRef.current = null;
//             }
//         };
//     }, [timerActive.current, duration]);

//     const startTimer = () => {
//         if (!timerActive.current) {
//             const startTime = Date.now();
//             startTimeRef.current = startTime;
//             localStorage.setItem('startTime', startTime.toString());
//             timerActive.current = true;
//             console.log('[useTimer] Timer started.');
//         }
//     };

//     const stopTimer = () => {
//         if (timerActive.current) {
//             timerActive.current = false;
//             if (timerIdRef.current !== null) {
//                 clearInterval(timerIdRef.current);
//                 timerIdRef.current = null;
//             }
//             // Удаляем только elapsedTime, startTime оставляем для восстановления
//             localStorage.removeItem('elapsedTime');
//         }
//     };

//     return { remainingTime, startTimer, stopTimer };
// };

// export default useTimer;
import { useEffect, useRef, useState } from 'react'

const useTimer = (duration: number) => {
    const [remainingTime, setRemainingTime] = useState(duration);
    const timerId = useRef<number | null>(null);
    const startTime = useRef<number | null>(null);
    const timerActive = useRef(false);

    // Функция для запуска таймера
    const startTimer = () => {
        if (!timerActive.current) {
            const storedStartTime = localStorage.getItem('startTime');
            startTime.current = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
            localStorage.setItem('startTime', startTime.current.toString());
            timerActive.current = true;

            timerId.current = window.setInterval(() => {
                const elapsed = Date.now() - startTime.current!;
                const remaining = duration - elapsed;

                setRemainingTime((_prev) => {
                    const newRemaining = duration - elapsed;
                    return newRemaining > 0 ? newRemaining : 0;
                });

                if (remaining <= 0) stopTimer();
            }, 1000);
        }
    };

    // Функция для остановки таймера
    const stopTimer = () => {
        if (timerActive.current) {
            timerActive.current = false;
            if (timerId.current !== null) {
                clearInterval(timerId.current);
                timerId.current = null;
            }
            if (remainingTime <= 0) {
                localStorage.removeItem('startTime');
            }
        }
    };

    // Восстановление состояния таймера при монтировании компонента
    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        if (storedStartTime) {
            const elapsed = Date.now() - parseInt(storedStartTime, 10);
            if (elapsed < duration) {
                startTimer();
                setRemainingTime(duration - elapsed);
            } else {
                localStorage.removeItem('startTime');
            }
        }

        return () => {
            if (timerActive.current) stopTimer();
        };
    }, [duration]);

    return { remainingTime, startTimer, stopTimer };
};

export default useTimer;