import React from 'react';
import { motion } from 'framer-motion';

const Loader : React.FC = () => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center justify-center mt-[150px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
        </motion.div>
    );
}

export default Loader;