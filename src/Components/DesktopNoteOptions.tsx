import React from 'react';
import whiteTrashIcon from '../images/whiteTrashIcon.svg';
import shareIcon from '../images/icons8-share.svg';

interface DesktopNoteOptionsProps {
    removeNote : (id: string) => void;
    userId: string;
    noteId: string;
}

const DesktopNoteOptions : React.FC<DesktopNoteOptionsProps> = ({removeNote, userId, noteId}) => {
    const onDeleteButtonClick = () => {

    };
    return (
        <div className='transition-all absolute w-[140px] h-[90px] bg-white dark:bg-[#151726] top-[40px] right-[18px] rounded-[15px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.3)]'>
            <button className="flex mb-[10px] mt-[20px] w-full" onClick={onDeleteButtonClick}>
                <img className="mx-[11px] w-[16px]" src={whiteTrashIcon}/>
                <p className="text-[#86888C] text-[15px] relative bottom-1">Delete Note</p>
            </button>
            <button className="flex mb-[20px] mt-[10px] w-full">
                <img className="mx-[11px] w-[16px]" src={shareIcon} style={{fill: 'blue'}}/>
                <p className="text-[#86888C] text-[15px] relative bottom-1">Share Note</p>
            </button>
        </div>
    );
}

export default DesktopNoteOptions;