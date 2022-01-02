import React from 'react';

interface SubmitButtonProps {
    text: string;
    bgColor?: string;
}

const SubmitButton : React.FC<SubmitButtonProps> = ({text, bgColor}) => {
    return <button className={"text-center text-white w-full text-[25px] py-[23px] font-bold rounded-[15px] mt-[20px] " + (bgColor || 'bg-[#7E27B7]')} 
    type="submit"
    >
        {text}
    </button>
}

export default SubmitButton;