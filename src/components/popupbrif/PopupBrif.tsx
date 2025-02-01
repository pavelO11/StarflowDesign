// import { useForm } from '@mantine/form'
// import { motion } from 'framer-motion'
// import { useOutsideClick } from '../popupbrif/outsideClick/useOutsideClick'

// import { sendMessage } from '../../api/telegram'
// import useTimer from '../hooks/useTimer'

// import { useEffect, useState } from 'react'


// import { popupAnimation } from '../animations/modals'
// import useSplittingHover from '../hooks/useSplittingHover'
// import './popupbrif.scss'
// import SuccessContent from './successContent/SuccessContent'
// import TimerContent from './timerContent/TimerContent'

// interface Props {
//     onClose: () => void;
//     selectedService: string | null;
// }

// function PopupBrif(props: Props) {
//     const { ref } = useOutsideClick(props.onClose);
//     const [, setDrawerIsOpen] = useState(false);
//     const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
//     const [selectedProjectBudget, setSelectedProjectBudget] = useState<string | null>(null);
//     const [showDefaultContent, setShowDefaultContent] = useState(true);
//     const [showSuccessContent, setShowSuccessContent] = useState(false);
//     const [showThirdContent, setShowThirdContent] = useState(false);

    
    

//     useEffect(() => {
//       setDrawerIsOpen(true);
//     }, []);

//     useEffect(() => { // defining the project type
//         setSelectedProjectType(projectButtons.find(button => button.id === props.selectedService)?.value || null);
//     }, [props.selectedService]);

//     useEffect(() => { // disable overflow when popupbrif open
//     if (showDefaultContent || showSuccessContent || showThirdContent) {
//         document.body.style.overflow = 'hidden';
//     } else {
//         document.body.style.overflow = '';
//     }

//     return () => {
//         document.body.style.overflow = '';
//     };
//     }, [showDefaultContent, showSuccessContent, showThirdContent]);

//     const { remainingTime, startTimer, stopTimer } = useTimer(5 * 60 * 1000); // 5 minutes in milliseconds

//     useEffect(() => {
//         const checkActiveTimer = () => {
//             const storedStartTime = localStorage.getItem('startTime');
//             if (storedStartTime) {
//                 const elapsed = Date.now() - parseInt(storedStartTime, 10);
//                 if (elapsed < 5 * 60 * 1000) {
//                     setShowThirdContent(true);
//                     setShowDefaultContent(false);
//                     setShowSuccessContent(false);
//                     startTimer();
//                 } else {
//                     localStorage.removeItem('showThirdContent');
//                 }
//             }
//         };
        
//         checkActiveTimer();
//     }, [startTimer]);

//     useEffect(() => {
//         if (showThirdContent && remainingTime === 0) {
//             console.log('[PopupBrif] Timer finished, switching to default content.');
//             setShowThirdContent(false);
//             setShowDefaultContent(true);
//             localStorage.removeItem('showThirdContent');
//             stopTimer();
//         }
//     }, [remainingTime, showThirdContent]);

//     useEffect(() => {
//         setSelectedProjectType(projectButtons.find(button => button.id === props.selectedService)?.value || null);
//     }, [props.selectedService]);

//     useEffect(() => {
//         if (showDefaultContent || showSuccessContent || showThirdContent) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//         return () => {
//             document.body.style.overflow = '';
//         };
//     }, [showDefaultContent, showSuccessContent, showThirdContent]);

//     useEffect(() => {
//         if (showThirdContent) {
//             startTimer();
//         } else {
//             stopTimer();
//         }
//     }, [showThirdContent, startTimer, stopTimer]);

//     const form = useForm({
// 		mode: 'uncontrolled',
// 		initialValues: {
// 		    name: '',
// 		    contacts: '',
// 		    projectType: '',
// 		    projectBudget: '',
// 		    projectDetails: '',
// 		    projectLink: '',
// 		},

// 		validate: {
// 			name: (value) => {
// 				if (!value || value.trim() === '') return 'Введите ваше имя';
// 				return /^[\p{L} ]{1,32}$/u.test(value) ? null : 'Только буквы и не длиннее 32 символов';
// 			},
// 			contacts: (value) => {
// 				if (!value || value.trim() === '') return 'Введите ваши контакты';
// 				if (/^@?[a-zA-Z0-9_]{5,32}$/.test(value)) return null;
// 				if (/^[a-zA-Z0-9._%+-]+@(gmail\.com|vk\.com|mail\.ru|rambler\.ru|yandex\.ru|outlook\.com|yahoo\.com|mailfence\.com|protonmail\.com)$/.test(value)) return null;
// 				return 'Введите действительный адрес эл. почты или имя пользователя в Telegram';
// 			},
// 			projectBudget: (value) => {
// 				if (!value) return 'Выберите бюджет проекта';
// 				return null;
// 			},
// 			projectDetails: (value) => {
// 				if (!value) return 'Заполните данные проекта';
// 				return null;
// 			},
// 		  },
// 		});

// 		const projectButtons = [
// 			{ id: '1', title: 'Одностраничный сайт', value: 'Одностраничный сайт' },
// 			{ id: '2', title: 'Корпоративный сайт', value: 'Корпоративный сайт'},
// 			{ id: '3', title: 'Интернет-магазин', value: 'Интернет-магазин'},
// 			{ id: '4', title: 'Дизайн в Figma',  value: 'Дизайн в Figma'},
// 		];
		
// 		const projectBudget = [
// 			{ id: '1', title: 'Менее 50к', value: 'Менее 50к' },
// 			{ id: '2', title: '50к-80к', value: '50-80к' },
// 			{ id: '3', title: '80к-120к', value: '80к-120к' },
// 			{ id: '4', title: 'Более 120к', value: 'Более 120к'},
// 		];


//   const handleFormSubmit = async ({ name, contacts, projectType, projectBudget, projectDetails, projectLink }: typeof form.values) => {
//     try {
//         const date = new Date();
//         const options: Intl.DateTimeFormatOptions = {
//             year: '2-digit',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: false,
//             timeZone: 'Asia/Yekaterinburg',
//         };
//         const formatter = new Intl.DateTimeFormat('ru-RU', options);
//         const formattedTime = formatter.format(date);

//         const message = `⚠️ НОВЫЙ ЗАКАЗ от ${formattedTime}⚠️\n\nИмя клиента: ${name},\nКонтакт: ${contacts},\nТип проекта: ${projectType},\nБюджет проекта: ${projectBudget},\nДетали проекта:\n${projectDetails}\nСсылка на редизайн: ${projectLink}`;

//         await sendMessage(message);
//         setShowDefaultContent(false); // Hide default
//         setShowSuccessContent(true);
//     } catch (e) {
//         form.setFieldError('projectLink', e as string);
//         console.error('Error', e);
//     }
//   };

//   const handleDrawerClose = () => {
//     if (showSuccessContent) {
//         setShowSuccessContent(false);
//         setShowThirdContent(true);
//         localStorage.setItem('showThirdContent', 'true');
//         startTimer();
//     } else if (showThirdContent) {
//         // Только скрываем компонент, не останавливаем таймер
//         setShowThirdContent(false);
//         props.onClose(); // Закрываем попап, но таймер продолжает работать
//     }
// };

//     useSplittingHover();

//   return (
//     <motion.section
//     className="overlay"
//     initial={{ opacity: 1 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 1 }}
//     transition={{ duration: 0.3 }}
//     >
//       {showDefaultContent ? (
//         <>
//            <motion.section
//            variants={popupAnimation}
//            animate='enter'
//            exit='exit'
//            initial='initial'
//            className='drawer' ref={ref}
//            >
//             <header>
//               <hgroup>
//                 <h5 className='startText'>Начнём<br />Сотрудничество!</h5>
//                 <h5 className='startTextSecond'>Начнём Сотрудничество!</h5>
//                 <button onClick={props.onClose} className='closeButton'><img alt='close' src='/close.svg' /></button>
//               </hgroup>
//               <hgroup className='horizontalText'>
//                 <p className='popupText'>Укажите Ваши контакты<br />и расскажите немного о проекте</p>
//                 <p style={{ color: '#B4B4B4'}} className='popupText'>*Обязательные поля</p>
//               </hgroup>
//             </header>
//             <form onSubmit={form.onSubmit(handleFormSubmit)}>
//               <fieldset className='horizontalGround'>
//                 <p className='popupText'>Ваши контакты</p>
//                 <fieldset className='inputContact'>
//                   <div>
//                     <input {...form.getInputProps('name')} className={`ownInput ${form.errors.name ? 'error' : ''}`} type='text' placeholder='Ваше имя*' />
//                     {form.errors.name && <p className='errorText'>{form.errors.name}</p>}
//                   </div>
//                   <div>
//                     <input {...form.getInputProps('contacts')} className={`ownInput ${form.errors.name ? 'error' : ''}`} type='text' placeholder='Telegram или E-mail*' />
//                     {form.errors.contacts && <p className='errorText'>{form.errors.contacts}</p>}
//                   </div>
//                 </fieldset>
//               </fieldset>
//               <fieldset className='horizontalGround'>
//                 <p className='popupText'>Тип проекта</p>
//                 <section className='buttonsMainT'>
//                   {projectButtons.map((project) => (
//                     <button
//                       key={project.id}
//                       className={`mainButtonT ${selectedProjectType === project.value ? 'selected' : ''}`}
//                       type='button'
//                       onClick={() => {
//                         form.setFieldValue('projectType', project.value);
//                         setSelectedProjectType(project.value);
//                       }}>
//                       {project.title}
//                     </button>
//                   ))}
//                 </section>
//               </fieldset>
//               <fieldset className='horizontalGround'>
//                   <p className='popupText'>Бюджет проекта (₽)*</p>
//                   <section className='buttonsMainB'>
//                     {projectBudget.map((project) => (
//                       <button
//                         key={project.id}
//                         className={`mainButtonB ${selectedProjectBudget === project.value ? 'selected' : ''} ${form.errors.projectBudget ? 'error' : ''}`}
//                         type='button'
//                         onClick={() => {
//                           form.setFieldValue('projectBudget', project.value);
//                           setSelectedProjectBudget(project.value);
//                         }}>
//                         {project.title}
//                       </button>
//                     ))}
//                   </section>
//                   {form.errors.projectBudget && <p className='errorText2'>{form.errors.projectBudget}</p>}
//               </fieldset>
//               <fieldset className='verticalGroundLast'>
//                 <p style={{ marginBottom: '8px'}} className='popupText'>Детали проекта</p>
//                 <div style={{ gap: '8px', display: 'flex', flexDirection: 'column', height: '100%' }}>
//                   <input {...form.getInputProps('projectLink')} className='ownInputSpecial' maxLength={1000} type='text' placeholder='Ссылка на сайт (если нужен редизайн)' />
//                   <textarea {...form.getInputProps('projectDetails')} className={`ownTextarea ${form.errors.projectDetails ? 'error' : ''}`} maxLength={3000} placeholder='Напишите, что ещё важно знать о Вашем проекте, цели, задачи*' />
//                 </div>
//                 {form.errors.projectDetails && <p className='errorText'>{form.errors.projectDetails}</p>}
//               </fieldset>
//               <button data-splitting type='submit' className='submitButton'>Отправить</button>
//             </form>
//           </motion.section>
//         </>
//       ) : showSuccessContent ? (
//         <SuccessContent ref={ref} handleDrawerClose={handleDrawerClose} />
//       ) : (
//         <TimerContent ref={ref} handleDrawerClose={handleDrawerClose} remainingTime={remainingTime} />
//       )}
//     </motion.section>
//   );
// }

// export default PopupBrif;
import { useForm } from '@mantine/form'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sendMessage } from '../../api/telegram'
import { overlayAnimation, popupAnimation } from '../animations/modals'
import useSplittingHover from '../hooks/useSplittingHover'
import useTimer from '../hooks/useTimer'
import { useOutsideClick } from '../popupbrif/outsideClick/useOutsideClick'
import './popupbrif.scss'
import SuccessContent from './successContent/SuccessContent'
import TimerContent from './timerContent/TimerContent'

interface Props {
    onClose: () => void;
    selectedService: string | null;
}

function PopupBrif(props: Props) {
    const { ref } = useOutsideClick(props.onClose);
    const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
    const [selectedProjectBudget, setSelectedProjectBudget] = useState<string | null>(null);
    const [showDefaultContent, setShowDefaultContent] = useState(true);
    const [showSuccessContent, setShowSuccessContent] = useState(false);
    const [showThirdContent, setShowThirdContent] = useState(false);
    // const { remainingTime, startTimer, stopTimer } = useTimer(5 * 60 * 1000);
    const { remainingTime, startTimer } = useTimer(5 * 60 * 1000);

    useEffect(() => {
        setSelectedProjectType(projectButtons.find(button => button.id === props.selectedService)?.value || null);
    }, [props.selectedService]);

    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        if (storedStartTime) {
            const elapsed = Date.now() - parseInt(storedStartTime, 10);
            if (elapsed < 5 * 60 * 1000) {
                setShowThirdContent(true);
                setShowDefaultContent(false);
                startTimer();
            } else {
                localStorage.removeItem('startTime');
            }
        }
    }, []);

    useEffect(() => {
        if (remainingTime <= 0) {
            setShowThirdContent(false);
            setShowDefaultContent(true);
            localStorage.removeItem('startTime');
        }
    }, [remainingTime]);

    //block scroll
    useEffect(() => {
        const disableScroll = () => {
            document.body.style.overflow = 'hidden';
        };

        const enableScroll = () => {
            document.body.style.overflow = '';
        };

        if (showDefaultContent || showSuccessContent || showThirdContent) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => {
            enableScroll(); // Всегда восстанавливаем прокрутку при размонтировании компонента
        };
    }, [showDefaultContent, showSuccessContent, showThirdContent]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            contacts: '',
            projectType: '',
            projectBudget: '',
            projectDetails: '',
            projectLink: '',
        },
        validate: {
            name: (value) => {
                if (!value || value.trim() === '') return 'Введите ваше имя';
                return /^[\p{L} ]{1,32}$/u.test(value) ? null : 'Только буквы и не длиннее 32 символов';
            },
            contacts: (value) => {
                if (!value || value.trim() === '') return 'Введите ваши контакты';
                if (/^@?[a-zA-Z0-9_]{5,32}$/.test(value)) return null;
                if (/^[a-zA-Z0-9._%+-]+@(gmail\.com|vk\.com|mail\.ru|rambler\.ru|yandex\.ru|outlook\.com|yahoo\.com|mailfence\.com|protonmail\.com)$/.test(value)) return null;
                return 'Введите действительный адрес эл. почты или имя пользователя в Telegram';
            },
            projectBudget: (value) => {
                if (!value) return 'Выберите бюджет проекта';
                return null;
            },
            projectDetails: (value) => {
                if (!value) return 'Заполните данные проекта';
                return null;
            },
        },
    });

    const projectButtons = [
        { id: '1', title: 'Одностраничный сайт', value: 'Одностраничный сайт' },
        { id: '2', title: 'Корпоративный сайт', value: 'Корпоративный сайт'},
        { id: '3', title: 'Интернет-магазин', value: 'Интернет-магазин'},
        { id: '4', title: 'Дизайн в Figma',  value: 'Дизайн в Figma'},
    ];
    
    const projectBudget = [
        { id: '1', title: 'Менее 50к', value: 'Менее 50к' },
        { id: '2', title: '50к-80к', value: '50-80к' },
        { id: '3', title: '80к-120к', value: '80к-120к' },
        { id: '4', title: 'Более 120к', value: 'Более 120к'},
    ];

    const handleFormSubmit = async (values: typeof form.values) => {
        try {
            const date = new Date();
            const options: Intl.DateTimeFormatOptions = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Yekaterinburg',
            };
            const formatter = new Intl.DateTimeFormat('ru-RU', options);
            const formattedTime = formatter.format(date);

            const message = `⚠️ НОВЫЙ ЗАКАЗ от ${formattedTime}⚠️\n\nИмя клиента: ${values.name},\nКонтакт: ${values.contacts},\nТип проекта: ${values.projectType},\nБюджет проекта: ${values.projectBudget},\nДетали проекта:\n${values.projectDetails}\nСсылка на редизайн: ${values.projectLink}`;

            await sendMessage(message);
            setShowDefaultContent(false);
            setShowSuccessContent(true);
            setTimeout(() => {
                setShowThirdContent(true);
                startTimer();
            }, 2000);
        } catch (e) {
            form.setFieldError('projectLink', e as string);
            console.error('Error', e);
        }
    };

    const handleDrawerClose = () => {
        if (showSuccessContent) {
            setShowSuccessContent(false);
            setShowThirdContent(true);
        } else if (showThirdContent) {
            setShowThirdContent(false);
            props.onClose();
        }
    };

    useSplittingHover();

    return (
        <motion.section
        variants={overlayAnimation}
        initial="initial"
        animate="enter"
        exit="exit"
        className="overlay"
        >
        {showDefaultContent ? (
            <>
            <motion.section
            variants={popupAnimation}
            animate='enter'
            exit='exit'
            initial='initial'
            className='drawer' ref={ref}
            >
                <header>
                <hgroup>
                    <h5 className='startText'>Начнём<br />Сотрудничество!</h5>
                    <h5 className='startTextSecond'>Начнём Сотрудничество!</h5>
                    <button onClick={props.onClose} className='closeButton'><img alt='close' src='/close.svg' /></button>
                </hgroup>
                <hgroup className='horizontalText'>
                    <p className='popupText'>Укажите Ваши контакты<br />и расскажите немного о проекте</p>
                    <p style={{ color: '#B4B4B4'}} className='popupText'>*Обязательные поля</p>
                </hgroup>
                </header>
                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                <fieldset className='horizontalGround'>
                    <p className='popupText'>Ваши контакты</p>
                    <fieldset className='inputContact'>
                    <div>
                        <input {...form.getInputProps('name')} className={`ownInput ${form.errors.name ? 'error' : ''}`} type='text' placeholder='Ваше имя*' />
                        {form.errors.name && <p className='errorText'>{form.errors.name}</p>}
                    </div>
                    <div>
                        <input {...form.getInputProps('contacts')} className={`ownInput ${form.errors.name ? 'error' : ''}`} type='text' placeholder='Telegram или E-mail*' />
                        {form.errors.contacts && <p className='errorText'>{form.errors.contacts}</p>}
                    </div>
                    </fieldset>
                </fieldset>
                <fieldset className='horizontalGround'>
                    <p className='popupText'>Тип проекта</p>
                    <section className='buttonsMainT'>
                    {projectButtons.map((project) => (
                        <button
                        key={project.id}
                        className={`mainButtonT ${selectedProjectType === project.value ? 'selected' : ''}`}
                        type='button'
                        onClick={() => {
                            form.setFieldValue('projectType', project.value);
                            setSelectedProjectType(project.value);
                        }}>
                        {project.title}
                        </button>
                    ))}
                    </section>
                </fieldset>
                <fieldset className='horizontalGround'>
                    <p className='popupText'>Бюджет проекта (₽)*</p>
                    <section className='buttonsMainB'>
                        {projectBudget.map((project) => (
                        <button
                            key={project.id}
                            className={`mainButtonB ${selectedProjectBudget === project.value ? 'selected' : ''} ${form.errors.projectBudget ? 'error' : ''}`}
                            type='button'
                            onClick={() => {
                            form.setFieldValue('projectBudget', project.value);
                            setSelectedProjectBudget(project.value);
                            }}>
                            {project.title}
                        </button>
                        ))}
                    </section>
                    {form.errors.projectBudget && <p className='errorText2'>{form.errors.projectBudget}</p>}
                </fieldset>
                <fieldset className='verticalGroundLast'>
                    <p style={{ marginBottom: '8px'}} className='popupText'>Детали проекта</p>
                    <div style={{ gap: '8px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <input {...form.getInputProps('projectLink')} className='ownInputSpecial' maxLength={1000} type='text' placeholder='Ссылка на сайт (если нужен редизайн)' />
                    <textarea {...form.getInputProps('projectDetails')} className={`ownTextarea ${form.errors.projectDetails ? 'error' : ''}`} maxLength={3000} placeholder='Напишите, что ещё важно знать о Вашем проекте, цели, задачи*' />
                    </div>
                    {form.errors.projectDetails && <p className='errorText'>{form.errors.projectDetails}</p>}
                </fieldset>
                <button data-splitting type='submit' className='submitButton'>Отправить</button>
                </form>
            </motion.section>
            </>
        ) : showSuccessContent ? (
            <SuccessContent ref={ref} handleDrawerClose={handleDrawerClose} />
        ) : (
            <TimerContent ref={ref} handleDrawerClose={handleDrawerClose} remainingTime={remainingTime} />
        )}
    </motion.section>
    );
}

export default PopupBrif;