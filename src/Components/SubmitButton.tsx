import React from 'react';
import {motion} from 'framer-motion';
import ButtonLoader from './ButtonLoader';

interface SubmitButtonProps {
    text: string;
    bgColor?: string;
    small?: boolean;
    isLoading: boolean;
}

const SubmitButton : React.FC<SubmitButtonProps> = ({text, bgColor, small, isLoading}) => {
    return <motion.button initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className={`text-center active:scale-[0.975] active:transition-all text-white w-full text-[25px] py-[23px] font-bold rounded-[15px] mt-[20px] h-[65.5px] ${small ? 'py-[14px] mt-[15px]': ''} ` + (bgColor || 'bg-[#7E27B7]')} 
    type="submit"
    >
        {!isLoading && <span>{text}</span>}
        {isLoading && <ButtonLoader/>}
    </motion.button>
}

export default SubmitButton;