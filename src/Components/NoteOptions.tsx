import React, {Dispatch, SetStateAction} from 'react';
import whiteTrashIcon from '../images/whiteTrashIcon.svg';
import editIcon from '../images/editIcon.svg';
import viewIcon from '../images/eye.svg';
import shareIcon from '../images/icons8-share.svg';
import axios from 'axios';

interface NoteOptionsProps {
    noteOptionsIsShowing : boolean;
    setNoteOptionsIsShowing : Dispatch<SetStateAction<boolean>>;
    currentNoteId: string;
    currentTitle: string;
    userId: string | undefined;
    removeNote: (id : string) => void;
    history: {push : (routeName: string) => void,  replace : (routeName: string) => void};
}

const NoteOptions : React.FC<NoteOptionsProps> = ({noteOptionsIsShowing, setNoteOptionsIsShowing, currentNoteId, userId, removeNote, history, currentTitle}) => {
    const noteOptionsClasses = "noteOptionsContainer fixed bottom-0 w-full flex flex-col bg-white dark:bg-[#151722] z-20 rounded-t-[35px] p-[15px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]";
    const closeNoteOptionsClasses = "fixed bottom-0 top-0 right-0 left-0 closeNoteOptions z-10"
    const onDeleteButtonClick = async () => {
        console.log(currentNoteId);
        const apiEndpoint = `https://notelyapp1.herokuapp.com/api/v1/notes/${userId}/${currentNoteId}`;
        if (window.confirm("Are you sure you want to delete this note?")) {
            setNoteOptionsIsShowing(false);
            try {
                const {data} = await axios.delete(apiEndpoint);
                console.log(data);
                removeNote(currentNoteId);
                
            } catch (error) {
                console.log(error);
                alert("Note could not be deleted successfully");
            }
        }
    }
    const onEditButtonClick = () => {
        history.push(`/editNote/${userId}/${currentNoteId}`);
    }
    const onViewNoteButtonClick = () => {
        history.push(`/viewNote/${userId}/${currentNoteId}`);
    }
    const onShareButtonClick = () => {
        if (navigator.share) {
            navigator.share({
                title: currentTitle, 
                url: `http://localhost:3000/sharedNote/${currentNoteId}`
            })
        }
    }
    return (
        <>
            <div onClick={() => setNoteOptionsIsShowing(false)} className={noteOptionsIsShowing ? closeNoteOptionsClasses : closeNoteOptionsClasses + ' invisible'}></div>
            <div className={noteOptionsIsShowing ? noteOptionsClasses : noteOptionsClasses + ' invisible'}>
                <div className="w-[100px] h-[8px] dongle rounded-[4px] mx-auto mb-[15px]"></div>
                <button className="flex mb-[20px]" onClick={onEditButtonClick}>
                    <img alt="icon" className="mx-[22px] w-[26px]" src={editIcon}/>
                    <p className="text-[#86888C]">Edit Note</p>
                </button>
                <button className="flex mb-[20px]" onClick={onDeleteButtonClick}>
                    <img alt="icon" className="mx-[20px] w-[30px]" src={whiteTrashIcon}/>
                    <p className="text-[#86888C]">Delete Note</p>
                </button>
                <button className="flex mb-[20px]" onClick={onViewNoteButtonClick}>
                    <img alt="icon" className="mx-[20px] w-[30px]" src={viewIcon}/>
                    <p className="text-[#86888C]">View Note</p>
                </button>
                <button className="flex" onClick={onShareButtonClick}>
                    <img alt="icon" className="mx-[20px] w-[30px]" src={shareIcon}/>
                    <p className="text-[#86888C]">Share Note</p>
                </button>
            </div>
        </>
    );
}

export default NoteOptions;