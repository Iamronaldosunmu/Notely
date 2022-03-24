import React, {Dispatch, SetStateAction} from 'react';
import xsymbol from '../images/x-symbol.svg';
import { useHistory } from 'react-router-dom';
import {motion} from 'framer-motion'

interface ViewDesktopImageProps {
    setViewImageIsShowing : Dispatch<SetStateAction<boolean>>;
}

const ViewDesktopImage : React.FC<ViewDesktopImageProps> = ({setViewImageIsShowing}) => {
    const history = useHistory();
    return (
        <>
            <motion.figure className='w-screen h-screen flex items-center justify-center bg-gray-900 absolute'>
                <motion.img layoutId={"1"} className='w-[60%] max-h-[70%] rounded-[30px]' src="https://res.cloudinary.com/ronaldosunmu/image/upload/v1648073551/gnesjwis9mpuzstjcdrf.jpg"/>
            </motion.figure>
            <button onClick={() => setViewImageIsShowing(false)} className='transition-all absolute right-0 top-0 w-[80px] h-[80px] bg-opacity-10 hover:bg-slate-800'>
                <img src={xsymbol} className="scale-50"/>
            </button>
        </>
    )
}
export default ViewDesktopImage;