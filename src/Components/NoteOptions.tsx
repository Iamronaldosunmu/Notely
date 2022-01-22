import React, {Dispatch, SetStateAction} from 'react';
import whiteTrashIcon from '../images/whiteTrashIcon.svg';
import editIcon from '../images/editIcon.svg';
import viewIcon from '../images/eye.svg';

interface NoteOptionsProps {
    noteOptionsIsShowing : boolean;
    setNoteOptionsIsShowing : Dispatch<SetStateAction<boolean>>;
    currentNoteId: string;
}

const NoteOptions : React.FC<NoteOptionsProps> = ({noteOptionsIsShowing, setNoteOptionsIsShowing, currentNoteId}) => {
    const noteOptionsClasses = "noteOptionsContainer fixed bottom-0 w-full flex flex-col bg-[#151722] z-20 rounded-t-[35px] p-[15px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]";
    const closeNoteOptionsClasses = "fixed bottom-0 top-0 right-0 left-0 closeNoteOptions z-10"
    const onDeleteButtonClick = () => {
        console.log(currentNoteId);
    }
    return (
        <>
            <div onClick={() => setNoteOptionsIsShowing(false)} className={noteOptionsIsShowing ? closeNoteOptionsClasses : closeNoteOptionsClasses + ' invisible'}></div>
            <div className={noteOptionsIsShowing ? noteOptionsClasses : noteOptionsClasses + ' invisible'}>
                <div className="w-[100px] h-[8px] dongle rounded-[4px] mx-auto mb-[15px]"></div>
                <button className="flex mb-[20px]">
                    <img className="mx-[22px] w-[26px]" src={editIcon}/>
                    <p className="dark:text-[#86888C]">Edit Note</p>
                </button>
                <button className="flex mb-[20px]" onClick={onDeleteButtonClick}>
                    <img className="mx-[20px] w-[30px]" src={whiteTrashIcon}/>
                    <p className="dark:text-[#86888C]">Delete Note</p>
                </button>
                <button className="flex">
                    <img className="mx-[20px] w-[30px]" src={viewIcon}/>
                    <p className="dark:text-[#86888C]">View Note</p>
                </button>
            </div>
        </>
    );
}

export default NoteOptions;