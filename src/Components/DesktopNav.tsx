import React from 'react';
import noteIcon from '../images/noteIcon.svg';
import folderIcon from '../images/folderIcon.png';
import settingsIcon from '../images/settingsIcon.png';

const DesktopNav : React.FC = () => {
    return (
        <section className="w-[195px] h-screen dark:bg-[#151722] pt-[32px]">
            <h1 className="ml-[28px] text-[36px] mb-[33px] text-white"><span className="font-bold">Note</span><span>ly</span></h1>
            <button className="flex items-center ml-[28px] bg-[rgba(92,66,108,0.35)] pl-[10px] py-[10px] rounded-[12px] w-[148px]">
                <img className="" src={noteIcon}/>
                <p className="text-white ml-[11px]  ">All Notes</p>
            </button>
            <button className="flex items-center ml-[28px] pl-[10px] py-[10px] rounded-[12px] w-[148px]">
                <img className="" src={folderIcon}/>
                <p className="text-white ml-[11px]  ">All Folders</p>
            </button>
            <button className="flex items-center ml-[28px] pl-[10px] py-[10px] rounded-[12px] w-[148px]">
                <img className="" src={settingsIcon}/>
                <p className="text-white ml-[11px]  ">Settings</p>
            </button>
        </section>
    );
};
export default DesktopNav;