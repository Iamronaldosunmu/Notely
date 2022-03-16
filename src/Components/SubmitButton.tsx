import React from 'react';
import {motion} from 'framer-motion';

interface SubmitButtonProps {
    text: string;
    bgColor?: string;
    small?: boolean;
}

const SubmitButton : React.FC<SubmitButtonProps> = ({text, bgColor, small}) => {
    return <motion.button initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className={`text-center active:scale-[0.975] active:transition-all text-white w-full text-[25px] py-[23px] font-bold rounded-[15px] mt-[20px] ${small ? 'py-[14px] mt-[15px]': ''} ` + (bgColor || 'bg-[#7E27B7]')} 
    type="submit"
    >
        {text}
    </motion.button>
}

export default SubmitButton;