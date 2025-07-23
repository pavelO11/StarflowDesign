export const popupAnimation = {
    initial: {
        x: '100%', // Начальное положение (за пределами экрана справа)
    },
    enter: {
        x: '0%', // Конечное положение (полностью видимо)
        transition: {
            duration: 0.8, // Продолжительность анимации
            ease: [0.63, 0.05, 0.36, 1], // Кастомная easing-функция
        },
    },
    exit: {
        x: '100%', // Возвращение за пределы экрана справа
        transition: {
            duration: 0.6, // Продолжительность анимации
            ease: [0.63, 0.05, 0.36, 1], // Кастомная easing-функция
        },
    },
};

export const burgerAnimation = popupAnimation;

export const overlayAnimation = {
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  enter: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transition: { duration: 0.6, ease: [0.63, 0.05, 0.36, 1] },
  },
  exit: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: { duration: 0.6, ease: [0.63, 0.05, 0.36, 1] },
  },
};