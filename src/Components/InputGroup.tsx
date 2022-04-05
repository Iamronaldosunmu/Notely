import React from 'react';
import {motion} from 'framer-motion';

interface InputProps {
    id: string;
    placeholder: string;
    label: string;
    type?: string;
    small?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const inputStyles : string = "placeholder:text-[18px] placeholder:font-['Lato'] placeholder:text-[#B4B4B4] px-[20px] py-[25px] border border-[#B4B4B4] rounded-[12px] focus:outline-none ";

const InputGroup : React.FC<InputProps> = ({id, placeholder, label, type, small, value, onChange}) => {
    return (
    <motion.div initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className={small ? "flex flex-col mb-[15px] lg:mb-[15px]" : "flex flex-col mb-[25px]"}>
        <label className={small ? "text-[20px] font-bold mb-[8px] lg:text-[18px] lg:mb-[6px]" : "text-[24px] font-bold mb-[8px]"} htmlFor={id}>{label}</label>
        <input className={small ? inputStyles + 'py-[15px]' : inputStyles} 
         placeholder={placeholder} 
         id={id}
         type={type || 'text'}
         value={value}
         onChange={onChange}
         />
    </motion.div>
    );
}

export default InputGroup;