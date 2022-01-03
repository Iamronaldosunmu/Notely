import React from 'react';

interface InputProps {
    id: string;
    placeholder: string;
    label: string;
    type?: string;
    small?: boolean;
}
const inputStyles : string = "placeholder:text-[18px] placeholder:font-['Lato'] placeholder:text-[#B4B4B4] px-[20px] py-[25px] border border-[#B4B4B4] rounded-[12px] focus:outline-black ";

const InputGroup : React.FC<InputProps> = ({id, placeholder, label, type, small}) => {
    return (
    <div className={small ? "flex flex-col mb-[25px] lg:mb-[15px]" : "flex flex-col mb-[25px]"}>
        <label className={small ? "text-[24px] font-bold mb-[8px] lg:text-[18px] lg:mb-[6px]" : "text-[24px] font-bold mb-[8px]"} htmlFor={id}>{label}</label>
        <input className={small ? inputStyles + 'lg:py-[15px]' : inputStyles} 
         placeholder={placeholder} 
         id={id}
         type={type || 'text'}/>
    </div>
    );
}

export default InputGroup;