import React, {useState, Dispatch, SetStateAction} from 'react';
import noteIcon from '../images/noteIcon.svg';
import folderIcon from '../images/folderIcon.svg';
import settingsIcon from '../images/settingsIcon.svg';
import addIcon from '../images/addIcon.svg';
import DesktopNavItem from './DesktopNavItem';
import {motion} from 'framer-motion';

interface DesktopNavProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
}
const DesktopNav : React.FC<DesktopNavProps> = ({history, isFirstTime, setIsFirstTime}) => {
    const [selectedButton, setSelectedButton] = useState<string>("All Notes");
    const parentVariant = {
        initial : {}, 
        animate : {}, 
        exit: {}
    }


    return (
        <motion.section animate={{backgroundColor: ["#0e121a", "#151722"], transition: {duration: 0.3}}} className="transition-all relative w-[195px] h-screen dark:bg-[#151722] pt-[32px]">
            <motion.h1 animate={{opacity: 1, transition: {delay: 0.3, duration: 0.3}}} initial={isFirstTime ? {opacity: 0} : {opacity: 1}} className="transition-all ml-[28px] text-[36px] mb-[33px] dark:text-white "><span className="font-bold">Note</span><span>ly</span></motion.h1>

            <DesktopNavItem Label="All Notes" isFirstTime={isFirstTime} setSelectedButton={setSelectedButton} selected={selectedButton == "All Notes"}/>
            <DesktopNavItem Label="All Folders" isFirstTime={isFirstTime} setSelectedButton={setSelectedButton} selected={selectedButton == "All Folders"}/>
            <DesktopNavItem Label="Settings" isFirstTime={isFirstTime} setSelectedButton={setSelectedButton} selected={selectedButton == "Settings"}/>
            <motion.button initial={isFirstTime ? {opacity: 0} : {opacity: 1}} animate={{opacity: 1, transition: {duration: 0.3, delay: 1.9}}}
                className="absolute w-[84px] h-[84px] rounded-full bg-[white] dark:bg-[#1E1D2C] flex items-center justify-center bottom-[28px] left-[28px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] scale-[0.8] focus:outline-[0]" 
                onClick={() => history.push('/desktopDashboard/newNote')}>
                    <img alt="icon" src={addIcon}/>
            </motion.button>
        </motion.section>
    );
};
export default DesktopNav;