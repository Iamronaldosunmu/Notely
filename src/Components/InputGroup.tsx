import React from 'react';

interface InputProps {
    id: string;
    placeholder: string;
    label: string;
    type?: string;
}

const InputGroup : React.FC<InputProps> = ({id, placeholder, label, type}) => {
    return (
    <div className="flex flex-col mb-[25px]">
        <label className="text-[24px] font-bold mb-[8px]" htmlFor={id}>{label}</label>
        <input className="placeholder:text-[18px] placeholder:font-['Lato'] placeholder:text-[#B4B4B4] px-[20px] py-[25px] border border-[#B4B4B4] rounded-[12px] focus:outline-black" 
         placeholder={placeholder} 
         id={id}
         type={type || 'text'}/>
    </div>
    );
}

export default InputGroup;