import React, {Dispatch, SetStateAction} from 'react';

interface MobileNavItemProps {
    selected: boolean;
    name: string;
    setSelectedMobileNavItem: Dispatch<SetStateAction<string>>;
    onClick: () => void;
} 

const MobileNavItem : React.FC<MobileNavItemProps> = ({selected, name, setSelectedMobileNavItem, onClick}) => {
    const CirleClasses = "w-[22px] h-[22px] rounded-full mr-[20px] transition-all";
    const ButtonClasses = "text-[32px] font-black text-left text-['Lato'] text-[rgba(255,255,255,0.75)] flex items-center relative left-[-20px]";
    return (
        <button className={selected ? ButtonClasses + ' text-[rgba(255,255,255,1)]' : ButtonClasses } onClick={() => {setSelectedMobileNavItem(name); onClick()}}>
                    <div className={selected ? CirleClasses + ' bg-[#FF8B03]' : CirleClasses }></div>{name}</button>
    );
}
export default MobileNavItem;