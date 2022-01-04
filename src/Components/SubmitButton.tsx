import React from 'react';

interface SubmitButtonProps {
    text: string;
    bgColor?: string;
    small?: boolean;
}

const SubmitButton : React.FC<SubmitButtonProps> = ({text, bgColor, small}) => {
    return <button className={`text-center active:scale-[0.975] active:transition-all text-white w-full text-[25px] py-[23px] font-bold rounded-[15px] mt-[20px] ${small ? 'lg:py-[14px] lg:mt-[15px]': ''} ` + (bgColor || 'bg-[#7E27B7]')} 
    type="submit"
    >
        {text}
    </button>
}

export default SubmitButton;