import React, {useState, Dispatch, SetStateAction} from 'react';
import ColorCircle from './ColorCircle';
import expandIcon from '../images/expandIcon.svg';
import lightModeExpandIcon from '../images/lightModeExpandIcon.svg';

interface OptionsMenuProps {
    selectedColor: string;
    setSelectedColor: Dispatch<SetStateAction<string>>;
}

const OptionsMenu : React.FC<OptionsMenuProps> = ({selectedColor, setSelectedColor}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="fixed w-full bottom-0 p-[10px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] dark:bg-[#151722] rounded-t-[25px]" >
            <div className=" flex justify-between">
                <div className="max-w-[calc(100% - 110px)] overflow-hidden rounded-r-[10px]">
                    <div className="whitespace-nowrap overflow-y-auto p-[10px] pr-[0px] rounded-r-[20px] colorCircleContainer">
                        <ColorCircle setSelectedColor={setSelectedColor} color='#3269ff' selected={selectedColor == '#3269ff'} />
                        <ColorCircle setSelectedColor={setSelectedColor} color='#ffd947' selected={selectedColor == '#ffd947'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='white' selected={selectedColor == 'white'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#ae3b76'selected={selectedColor == '#ae3b76'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#fe7745'selected={selectedColor == '#fe7745'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#0e121a'selected={selectedColor == '#0e121a'}/>
                    </div>
                </div>
                <button className="ml-[14px] mr-[8px] flex items-center justify-center" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className={isCollapsed ? "w-[20px] expandIcon" : "w-[20px] expandIcon expanded"} src={expandIcon} /> : <img className={isCollapsed ? "w-[20px] expandIcon" : "w-[20px] expandIcon expanded"} src={lightModeExpandIcon} />}
                </button>
            </div>
            <div>
                <button className="flex">
                    <img className="mr-[20px]"/>
                    <p className="dark:text-white text-[18px]">Delete note</p>
                </button>
                <button className="flex">
                    <img className="mr-[20px] "/>
                    <p className="dark:text-white text-[18px]">Upload a note</p>
                </button>
            </div>
        </div>
    );
}

export default OptionsMenu;