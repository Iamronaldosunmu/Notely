import React from 'react';

const Paragraph : React.FC = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <p className="transition-all text-white px-[10px] py-[5px] rounded-full dark:bg-[rgba(0,0,0,0.25)] bg-[rgba(123,123,123,0.25)] font-medium"> Selected notes will appear here </p>
        </div>
    );
};
export default Paragraph;