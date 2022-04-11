import React from 'react';
import {motion} from 'framer-motion';

const ButtonLoader = () => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center justify-center">
            <div className="w-[14px] h-[14px] rounded-full bg-white mr-[5px] loadingCircle"></div>
            <div className="w-[14px] h-[14px] rounded-full bg-white mr-[5px] loadingCircle"></div>
            <div className="w-[14px] h-[14px] rounded-full bg-white mr-[5px] loadingCircle"></div>
         </motion.div>
    )
}
export default ButtonLoader;