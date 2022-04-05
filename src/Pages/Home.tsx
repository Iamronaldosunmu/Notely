import React, {useState} from 'react';
import MobileNavItem from '../Components/MobileNavItem';
import sally from '../images/sally.png';
import {motion} from 'framer-motion';

interface HomeProps {
    history: {push : (routeName: string) => void,  replace : (routeName: string) => void}
}

const Home : React.FC<HomeProps> = ({history}) => {
    const [mobileNavIsShowing, setMobileNavIsShowing] = useState<boolean>(false);
    const [selectedMobileNavItem, setSelectedMobileNavItem] = useState<string>('Home');
    const navContainerVariants = {
        initial : {
            opacity: 1
        }, 
        animate : {
            opacity : 1, 
            transition: {
                staggerChildren : 0.1
            }
        }, 
        exit : {
            opacity : 1
        }
    }
    const navButtonVariants = {
        initial : {
            opacity: 0
        }, 
        animate : {
            opacity : 1
        }, 

    }
    return (
        <motion.div className="bg-[#5352ED] min-h-[100vh] lg:overflow-y-hidden lg:h-[100vh]" exit={{opacity: 0, transition: {duration: 0.6, delay: 0.8}}}>
            <div className="bg-[#5352ED] min-h-[100vh] container mx-auto">
                <motion.nav exit={{opacity: 0, y: 80, transition: {duration: 0.6, delay: 0.2}}} className="px-[25px] lg:px-[50px] pt-[15px] flex justify-between items-center">
                    <p className="text-[32px] lg:text-[48px] text-white latoFamily"><span className="font-black">Note</span><span className="">ly</span></p>
                    <motion.button variants={navContainerVariants} initial="initial" animate="animate" exit="exit" className="flex lg:hidden z-10" onClick={() => setMobileNavIsShowing(true)}>
                        <motion.div variants={navButtonVariants} className="w-[16px] h-[16px] rounded-full bg-white mr-[6px]"></motion.div>
                        <motion.div variants={navButtonVariants} className="w-[16px] h-[16px] rounded-full bg-white mr-[6px]"></motion.div>
                        <motion.div variants={navButtonVariants} className="w-[16px] h-[16px] rounded-full bg-white"></motion.div>
                    </motion.button>
                    <motion.div variants={navContainerVariants} initial="initial" animate="animate" exit="exit" className="hidden lg:flex justify-between items-center w-full max-w-[525px]">
                        <motion.button variants={navButtonVariants} className="text-[30px] z-10 text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem">Contact Us</motion.button>
                        <motion.button variants={navButtonVariants} className="text-[30px] z-10 text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem" onClick={() => {history.push('/signIn')}}>Sign In</motion.button>
                        <motion.button variants={navButtonVariants} className="text-[30px] z-10 text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem" onClick={() => history.push('/signUp')}>Sign Up</motion.button>
                    </motion.div>
                </motion.nav>
                <section className="px-[25px] lg:px-[50px] mt-[50px] text-center lg:text-left pb-[40px] flex flex-col lg:flex-row lg:justify-between ">
                    <div>
                        <motion.p initial={{opacity:0, y:50}} animate={{opacity:1, y: 0}} exit={{opacity: 0, y: 80, transition: {duration: 0.6, delay: 0.2}}} transition={{delay:1.6, duration: 0.3}} className="text-center lg:text-left text-[45px] lg:text-[50px] xl:text-[68px] 2xl:text-[79px] lg:leading-[1.85] xl:leading-[1.75] 2xl:leading-[1.66] font-black text-white latoFamily max-w-[345px] lg:max-w-[470px] xl:max-w-[560px] mx-auto lg:mx-[0]">The online notepad for all your devices</motion.p>
                        <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0, y: 80, transition: {duration: 0.6, delay: 0.2}}} transition={{delay:2.4, duration: 0.3}} className="text-center lg:text-left text-white text-[18px] lg:text-[22px]  mt-[20px] lg:mt-[35px] xl:mt-[30px] 2xl:mt-[20px] max-w-[585px] lg:max-w-[470px] xl:max-w-[560px] mx-auto lg:mx-[0]">You don’t need a different notepad app for your phone, tablet, and laptop, just use Notely!</motion.p>
                        <motion.button whileHover={{scale: 0.9}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0, y: 80, transition: {duration: 0.6, delay: 0.2}}} transition={{delay:3.7}}  className="text-[22px] text-[#474956] bg-white py-[14px] px-[67px] lg:px-[100px] rounded-[18px] mt-[35px] lg:mt-[50px] xl:mt-[55px] 2xl:mt-[40px] z-30" onClick={() => history.push('/signUp')}>Get started</motion.button>
                    </div>
                    <motion.img initial={{opacity:0, scale: 0.8, y: 50}} animate={{opacity:1, scale: 1, y: 0}} exit={{opacity: 0, y: 80, transition: {duration: 0.6, delay: 0.2}}} transition={{delay:3}} src={sally} className="relative w-full max-w-[450px] lg:max-w-[540px] lg:bottom-[10px] xl:max-w-[690px] xl:bottom-[100px] mx-auto lg:mx-[0]" />
                </section>
            </div>
            <div className={mobileNavIsShowing ? "fixed lg:hidden top-0 bottom-0 right-0 left-0 closeMobileNav showing" : "lg:hidden top-0 bottom-0 right-0 left-0" } onClick={() => setMobileNavIsShowing(false)}></div>
            <div className={mobileNavIsShowing ?"fixed lg:hidden w-[300px] mx-auto h-[400px] top-0 right-0 left-0 bottom-0 my-auto rounded-[55px] shadow-[0_4px_64px_20px_rgba(0,0,0,0.16)] py-[70px] pl-[80px] bg-[#5352ED] flex flex-col justify-between mobileNavPopUp visible" : "fixed lg:hidden w-[300px] mx-auto h-[400px] top-0 right-0 left-0 bottom-0 my-auto rounded-[55px] shadow-[0_4px_64px_20px_rgba(0,0,0,0.16)] py-[70px] pl-[80px] bg-[#5352ED] flex flex-col justify-between mobileNavPopUp"}>
                <MobileNavItem selected={selectedMobileNavItem == "Home"} name="Home" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => setMobileNavIsShowing(false)}/>
                <MobileNavItem selected={selectedMobileNavItem == "Sign In"} name="Sign In" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => {history.push('/signIn'); setMobileNavIsShowing(false)}}/>
                <MobileNavItem selected={selectedMobileNavItem == "Sign Up"} name="Sign Up" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => {history.push('/signUp'); setMobileNavIsShowing(false)}}/>
            </div>
        </motion.div>
    );
}

export default Home;