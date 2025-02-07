import { useEffect } from 'react'

const useScrollLock = () => {
  useEffect(() => {
    // Получаем текущие координаты прокрутки
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    // Сохраняем их в переменных (если потребуется)
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      width: document.body.style.width,
    };

    // Блокируем прокрутку: фиксируем body и смещаем его по отрицательному значению scrollY
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;
    document.body.style.width = '100%';

    return () => {
      // Восстанавливаем стили
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.left = originalStyle.left;
      document.body.style.width = originalStyle.width;
      // Восстанавливаем прокрутку
      window.scrollTo(scrollX, scrollY);
    };
  }, []);
};

export default useScrollLock;