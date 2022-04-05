import React, {Dispatch, SetStateAction} from 'react';
import xsymbol from '../images/x-symbol.svg';
import { useHistory } from 'react-router-dom';
import {motion} from 'framer-motion'
import darkxsymbol from '../images/darkx-symbol.svg';


interface ViewMobileImageProps {
    setViewImageIsShowing : Dispatch<SetStateAction<boolean>>;
    imageUrl: string;
}

const ViewMobileImage : React.FC<ViewMobileImageProps> = ({setViewImageIsShowing, imageUrl}) => {
    const history = useHistory();
    return (
        <>
            <motion.figure className='w-screen h-screen flex items-center justify-center bg-white px-[15px] dark:bg-gray-900 absolute'>
                <motion.img layoutId={"1"} className='h-[300px] rounded-[30px] ' src={imageUrl}/>
            </motion.figure>
            <button onClick={() => setViewImageIsShowing(false)} className='transition-all absolute right-0 top-0 w-[80px] h-[80px] bg-opacity-10 dark:hover:bg-slate-800 hover:bg-gray-200'>
                <img src={xsymbol} className="scale-50 hidden dark:block"/>
                <img src={darkxsymbol} className="scale-50 dark:hidden"/>
            </button>
        </>
    )
}
export default ViewMobileImage;