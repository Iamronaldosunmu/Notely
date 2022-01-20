import React, {Dispatch, SetStateAction} from 'react';
import blackTickIcon from '../images/blackTickIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';

interface ColorCircleProps {
    color: string;
    selected?: boolean;
    setSelectedColor: Dispatch<SetStateAction<string>>;
}

const ColorCircle : React.FC<ColorCircleProps> = ({color, selected, setSelectedColor}) => {
    return (
        <div className={"w-[30px] h-[30px] rounded-full shadow-[0_0_0px_5px_rgba(100,100,100,0.2)] inline-block mr-[20px]"} style={{backgroundColor: color || 'white'}} onClick={() => setSelectedColor(color)}>
            {selected && <img className="w-[18px] mx-auto mt-[8.5px]" src={blackTickIcon} />}
        </div>
    );
}
export default ColorCircle;