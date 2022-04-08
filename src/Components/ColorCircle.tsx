import React, {Dispatch, SetStateAction} from 'react';
import blackTickIcon from '../images/blackTickIcon.svg';

interface ColorCircleProps {
    color: string;
    selected?: boolean;
    setSelectedColor: Dispatch<SetStateAction<string>>;
}

const ColorCircle : React.FC<ColorCircleProps> = ({color, selected, setSelectedColor}) => {
    return (
        <div className={"w-[30px] h-[30px] rounded-full dark:shadow-[0_0_0px_3px_rgba(100,100,100,0.2)] shadow-[0_0_0px_3px_rgba(150,150,150,0.2)] inline-block mr-[20px]"} style={{backgroundColor: color || 'white'}} onClick={() => setSelectedColor(color)}>
            {selected && <img alt="icon" className="w-[18px] mx-auto mt-[8.5px]" src={blackTickIcon} />}
        </div>
    );
}
export default ColorCircle;