import React, {useEffect} from 'react';
import {motion} from 'framer-motion';

interface LoadingScreenProps {
    history: {push : (routeName : string) => void};
}

const LoadingScreen : React.FC<LoadingScreenProps> = ({history}) => {
    const forScreenSize = (small : string | number, medium : string | number, large : string | number, extraLarge : string | number, xxLarge : string | number, xxxLarge: string | number  ) => {
        if (window.innerWidth < 640) return small;
        else if (window.innerWidth < 768) return medium;
        else if (window.innerWidth < 1024) return large;
        else if (window.innerWidth < 1280) return extraLarge;
        else if (window.innerWidth < 1532) return xxLarge;
        else return xxxLarge;
    }
    const letterContainerVariant = {
        initial : {
            y: 0
        },
        animate : {
            y: 0, 
            transition: {
                delayChildren : 0.6, 
                staggerChildren : 0.1
            }
        }, 
        exit : {
            x: forScreenSize("calc(-50vw + 73.755px)", "calc(-50vw + 73.755px + (100vw - 640px)/2 )", "calc(-50vw + 73.755px + (100vw - 768px)/2)", "calc(-50vw + 123.16px + (100vw - 1024px)/2)", "calc(-50vw + 123.16px + (100vw - 1280px)/2)", "calc(-50vw + 123.16px + (100vw - 1536px)/2)"),// 'calc(-50vw + 123.16px)', // + (100vw - 1280px) / 2)
            y: forScreenSize("calc(-50vh + 54px)", 'calc(-50vh + 54px)', 'calc(-50vh + 54px)', 'calc(-50vh + 66px)', 'calc(-50vh + 66px)', 'calc(-50vh + 66px)'),//'calc(-50vh + 66px)',
            scale: forScreenSize(0.4, 0.4, 0.4, 0.6, 0.6, 0.6 ),
            transition : {
                duration: 1.5, 
                delay: 2.4
            }
        }
    }
    const boldLetterVariant = {
        initial : {
            y: 400, 
            opacity: 0
        }, 
        animate : {
            y: 0, 
            opacity: 1, 
            transition: {
                duration: 0.8, 
                ease: [0.6, 0.01, -0.05, 0.9]
            }
        }

    }
    const letterVariant = {
        initial : {
            opacity: 0
        }, 
        animate : {
            opacity: 1, 
            transition: {
                delay: 2.32
            }
        }
    }
    useEffect(() => {
        setTimeout(() => history.push('/home'), 5000)
    }, [])
    return (
        <motion.main 
        className='w-screen h-screen flex flex-col items-center bg-[#5352ed] justify-center'
        >
            <motion.div variants={letterContainerVariant} initial="initial" animate="animate" exit="exit" className='text-white text-[80px] logo flex overflow-hidden'>
                <motion.p variants={boldLetterVariant} className="font-black">N</motion.p>
                <motion.p variants={boldLetterVariant} className="font-black">o</motion.p>
                <motion.p variants={boldLetterVariant} className="font-black">t</motion.p>
                <motion.p variants={boldLetterVariant} className="font-black">e</motion.p>
                <motion.p variants={letterVariant}>l</motion.p>
                <motion.p variants={letterVariant}>y</motion.p>
                {/* <span className="font-bold">Note</span>ly */}
            </motion.div>
            <motion.p 
            initial={{
                y: 30, 
                opacity: 0               
            }} 
            animate={{
                y: -10, 
                opacity: 1, 
                transition: {
                    delay: 3,
                    duration: 0.4, 
                }
            }}
            exit={{ 
                opacity: 0, 
                transition: {
                    delay: 1,
                    duration: 0.4, 
                }
            }}
            className='text-white text-[20px]'>All your notes in one place ...</motion.p>
        </motion.main>
    )
}
export default LoadingScreen;