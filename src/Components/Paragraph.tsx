import React from 'react';
import {motion} from 'framer-motion';

const Paragraph : React.FC = () => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.15}}} exit={{opacity: 0, transition: {duration: 0.15}}} className='w-full h-full flex justify-center items-center'>
            <p className="transition-all text-white px-[10px] py-[5px] rounded-full dark:bg-[rgba(0,0,0,0.25)] bg-[rgba(123,123,123,0.25)] font-medium"> Selected notes will appear here </p>
        </motion.div>
    );
};
export default Paragraph;