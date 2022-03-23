import React from 'react';
import xsymbol from '../images/x-symbol.svg';

const ViewDesktopImage : React.FC = () => {
    return (
        <>
            <figure className='w-screen h-screen flex items-center justify-center bg-gray-900'>
                <img className='w-[60%] max-h-[70%]' src="https://res.cloudinary.com/ronaldosunmu/image/upload/v1648073551/gnesjwis9mpuzstjcdrf.jpg"/>
            </figure>
            <button className='absolute right-0 top-0 w-[80px] h-[80px]'></button>
        </>
    )
}
export default ViewDesktopImage;