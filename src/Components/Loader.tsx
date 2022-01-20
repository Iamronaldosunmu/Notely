import React from 'react';

const Loader : React.FC = () => {
    return (
        <div className="flex items-center justify-center mt-[150px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
            <div className="w-[15px] h-[15px] rounded-full bg-[#e1917e] mr-[5px] loadingCircle"></div>
        </div>
    );
}

export default Loader;