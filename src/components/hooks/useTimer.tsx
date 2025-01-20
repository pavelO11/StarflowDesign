import { useEffect, useRef, useState } from 'react'

const useTimer = (duration: number) => {
    const [remainingTime, setRemainingTime] = useState(duration);
    const timerActive = useRef(false);
    const startTimeRef = useRef<number | null>(null);
    const timerIdRef = useRef<number | null>(null);

    // Восстановление состояния таймера из localStorage
    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        if (storedStartTime) {
            const startTime = parseInt(storedStartTime, 10);
            startTimeRef.current = startTime;
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const remaining = duration - elapsed;
            if (remaining > 0) {
                setRemainingTime(remaining);
                timerActive.current = true;
                console.log('[useTimer] Timer restored. Remaining time:', remaining);
            } else {
                setRemainingTime(0);
                localStorage.removeItem('startTime');
            }
        }
    }, [duration]);

    // Обработка интервала
    useEffect(() => {
        if (timerActive.current) {
            timerIdRef.current = window.setInterval(() => {
                if (startTimeRef.current !== null) {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTimeRef.current;
                    const remaining = duration - elapsed;
                    if (remaining > 0) {
                        setRemainingTime(remaining);
                        localStorage.setItem('elapsedTime', elapsed.toString());
                    } else {
                        setRemainingTime(0);
                        stopTimer();
                    }
                }
            }, 1000);
        } else if (timerIdRef.current !== null) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }

        return () => {
            if (timerIdRef.current !== null) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
        };
    }, [timerActive.current, duration]);

    const startTimer = () => {
        if (!timerActive.current) {
            const startTime = Date.now();
            startTimeRef.current = startTime;
            localStorage.setItem('startTime', startTime.toString());
            timerActive.current = true;
            console.log('[useTimer] Timer started.');
        }
    };

    const stopTimer = () => {
        if (timerActive.current) {
            console.log('[useTimer] Stopping timer.');
            timerActive.current = false;
            if (timerIdRef.current !== null) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
            localStorage.removeItem('startTime');
            localStorage.removeItem('elapsedTime');
        }
    };

    return { remainingTime, startTimer, stopTimer };
};

export default useTimer;