import React, {useState} from 'react';
import noteIcon from '../images/noteIcon.svg';
import folderIcon from '../images/folderIcon.svg';
import settingsIcon from '../images/settingsIcon.svg';
import addIcon from '../images/addIcon.svg';
import DesktopNavItem from './DesktopNavItem';

const DesktopNav : React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>("All Notes");

    return (
        <section className="transition-all relative w-[195px] h-screen dark:bg-[#151722] pt-[32px]">
            <h1 className="transition-all ml-[28px] text-[36px] mb-[33px] dark:text-white "><span className="font-bold">Note</span><span>ly</span></h1>
            <DesktopNavItem Label="All Notes" setSelectedButton={setSelectedButton} selected={selectedButton == "All Notes"}/>
            <DesktopNavItem Label="All Folders" setSelectedButton={setSelectedButton} selected={selectedButton == "All Folders"}/>
            <DesktopNavItem Label="Settings" setSelectedButton={setSelectedButton} selected={selectedButton == "Settings"}/>
            <button className="absolute w-[84px] h-[84px] rounded-full bg-[white] dark:bg-[#1E1D2C] flex items-center justify-center bottom-[28px] left-[28px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] scale-[0.8]" >
                    <img alt="icon" src={addIcon}/>
                </button>
        </section>
    );
};
export default DesktopNav;