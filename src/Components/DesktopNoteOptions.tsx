import React, {Dispatch, SetStateAction} from 'react';
import whiteTrashIcon from '../images/whiteTrashIcon.svg';
import shareIcon from '../images/icons8-share.svg';
import axios from 'axios';

interface DesktopNoteOptionsProps {
    removeNote : (id: string) => void;
    userId: string;
    noteId: string;
    isShowing: boolean;
    setIsShowing: Dispatch<SetStateAction<boolean>>;
    title: string;
}

const DesktopNoteOptions : React.FC<DesktopNoteOptionsProps> = ({removeNote, userId, noteId, isShowing, setIsShowing, title}) => {
    const visibleClasses = 'transition-all absolute w-[140px] h-[90px] bg-white dark:bg-[#151726] top-[40px] right-[18px] rounded-[15px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.3)] desktopOptions z-20';
    const hiddenClasses = visibleClasses + ' hiddenDesktopOptions';
    const onDeleteButtonClick = async () => {
        const apiEndpoint = `https://notelyapp1.herokuapp.com/api/v1/notes/${userId}/${noteId}`;
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                const {data} = await axios.delete(apiEndpoint);
                console.log(data);
                removeNote(noteId);
                
            } catch (error) {
                console.log(error);
                alert("Note could not be deleted successfully");
            }
        }
        setIsShowing(false)
    };
    const onShareButtonClick = () => {
        if (navigator.share) {
            navigator.share({
                title, 
                url: `https://notelysite.netlify.app/sharedNote/${noteId}`
            })
        }
    }
    return (
        <>
        <div className={isShowing ? visibleClasses : hiddenClasses} >
            <button className="flex mb-[10px] mt-[20px] w-full" onClick={onDeleteButtonClick}>
                <img alt="icon" className="mx-[11px] w-[16px]" src={whiteTrashIcon}/>
                <p className="text-[#86888C] text-[15px] relative bottom-1">Delete Note</p>
            </button>
            <button onClick={onShareButtonClick} className="flex mb-[20px] mt-[10px] w-full">
                <img alt="icon" className="mx-[11px] w-[16px]" src={shareIcon} style={{fill: 'blue'}}/>
                <p className="text-[#86888C] text-[15px] relative bottom-1">Share Note</p>
            </button>
        </div>
        {isShowing && <div className='fixed top-0 bottom-0 right-0 left-0 z-10' onClick={() => setIsShowing(false)}></div>}
        </>
    );
}

export default DesktopNoteOptions;