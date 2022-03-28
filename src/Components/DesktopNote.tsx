import React, {Dispatch, SetStateAction, useState} from 'react';
import DesktopNoteOptions from './DesktopNoteOptions';
import {useHistory} from 'react-router-dom';

interface DesktopNoteProps {
    _id: string;
    userId: string;
    color: string;
    title: string;
    noteContent: string;
    dateCreated: string;
    imageUrl?: string;
    setNoteOptionsIsShowing: Dispatch<SetStateAction<boolean>>;
    setCurrentNoteId: Dispatch<SetStateAction<string>>;
    onDesktop?: boolean;
    removeNote: (id: string) => void;
}


const DesktopNote : React.FC<DesktopNoteProps> = ({_id,userId, color, title, noteContent, dateCreated, imageUrl, setNoteOptionsIsShowing, setCurrentNoteId, onDesktop, removeNote}) => {
    const history = useHistory()
    const colorString = `bg-[${color}]`;
    const [desktopNoteOptionsIsShowing, setDesktopNoteOptionsIsShowing] = useState(false);
    const onNoteOptionsButtonClick = () => {
        setDesktopNoteOptionsIsShowing(!desktopNoteOptionsIsShowing);
        // setNoteOptionsIsShowing(true);
        // setCurrentNoteId(_id);
    }
    const onNoteClick = () => {
        const viewNoteUrl = onDesktop ? `../../../desktopDashboard/viewNote/${userId}/${_id}` : `/viewNote/${userId}/${_id}`;
        history.push(viewNoteUrl);

    }
    
    return (
        <div className="relative transition-all w-[100%] mx-auto mb-[12px] max-w-[200px] p-[18px] bg-white dark:bg-[#151722] rounded-[25px] mt-[10px] shadow-[0_4px_10px_3px_rgba(0,0,0,0.2)]">
            <header className="px-18px flex justify-between items-center mb-[8px]">
                <div className={'w-[12px] h-[12px] rounded-full bg-[#3A81C2]'} style={color ? {backgroundColor: color} : {}}></div>
                <button className="flex hover:scale-[1.15] transition-all" onClick ={onNoteOptionsButtonClick}>
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] rounded-full bg-[#77787F]"></div>
                </button>
            </header>
            <section  onClick={onNoteClick}>
                <img className={imageUrl ? "w-full rounded-[15px] max-h-[150px] cover my-[10px]" : "w-full rounded-[25px] max-h-[150px] cover" } src={imageUrl || ''} />
                <h1 className="tranisition-all text-[20px] dark:text-white font-bold mb-[12px] truncate ...">{title}</h1>
                <p className="tranisition-all text-[14px] font-light dark:text-[#A1A2A7] mb-[20px] noteContent">{noteContent}</p>
                <p className="tranisition-all text-[10px] mb-[6px] font-bold dark:text-[white]" >{dateCreated}</p>
            </section>
            <DesktopNoteOptions setIsShowing={setDesktopNoteOptionsIsShowing} userId={userId} noteId={_id} removeNote={removeNote} isShowing={desktopNoteOptionsIsShowing}/>
        </div>
    );
}

export default DesktopNote;