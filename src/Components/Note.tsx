import React, {Dispatch, SetStateAction} from 'react';
interface NoteProps {
    _id: string;
    userId: string;
    color: string;
    title: string;
    noteContent: string;
    dateCreated: string;
    imageUrl?: string;
    setNoteOptionsIsShowing: Dispatch<SetStateAction<boolean>>;
    setCurrentNoteId: Dispatch<SetStateAction<string>>;
    setCurrentTitle: Dispatch<SetStateAction<string>>;
    history: {push : (routeName: string) => void,  replace : (routeName: string) => void};
    onDesktop?: boolean;
    match?: {params: {noteId: string, userId: string}, url: string};
}

const Note : React.FC<NoteProps> = ({_id,userId, color, title, noteContent, dateCreated, imageUrl, setNoteOptionsIsShowing, setCurrentNoteId, setCurrentTitle, history, onDesktop, match}) => {
    const onNoteOptionsButtonClick = () => {
        setNoteOptionsIsShowing(true);
        setCurrentNoteId(_id);
        setCurrentTitle(title);
    }
    const onNoteClick = () => {
        const viewNoteUrl = onDesktop ? `../../../desktopDashboard/viewNote/${userId}/${_id}` : `/viewNote/${userId}/${_id}`;
        history.push(viewNoteUrl);

    }
    return (
        <div className="transition-all w-[100%] mx-auto mb-[12px] max-w-[200px] p-[18px] bg-white dark:bg-[#151722] rounded-[25px] mt-[10px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]">
            <header className="px-18px flex justify-between items-center mb-[8px]">
                <div className={'w-[12px] h-[12px] rounded-full bg-[#3A81C2]'} style={color ? {backgroundColor: color} : {}}></div>
                <button className="flex" onClick ={onNoteOptionsButtonClick}>
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] rounded-full bg-[#77787F]"></div>
                </button>
            </header>
            <section  onClick={onNoteClick}>
                <img alt="Note figure" className={imageUrl ? "w-full rounded-[15px] max-h-[150px] cover my-[10px]" : "w-full rounded-[25px] max-h-[150px] cover" } src={imageUrl || ''} />
                <h1 className="tranisition-all text-[20px] dark:text-white font-bold mb-[12px] truncate ...">{title}</h1>
                <p style={{whiteSpace: "pre-line"}} className="tranisition-all text-[14px] font-light dark:text-[#A1A2A7] mb-[20px] noteContent">{noteContent}</p>
                <p className="tranisition-all text-[10px] mb-[6px] font-bold dark:text-[white]" >{dateCreated}</p>
            </section>
        </div>
    );
};

export default Note;