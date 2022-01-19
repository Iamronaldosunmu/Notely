import React from 'react';

interface NoteProps {
    _id: string;
    userId: string;
    color?: string;
    title: string;
    noteContent: string;
    dateCreated: string;
    imageUrl?: string;
}

const Note : React.FC<NoteProps> = ({color, title, noteContent, dateCreated, imageUrl}) => {
    const colorString = `bg-[${color}]`;
    return (
        <div className="transition-all w-[100%] mx-auto mb-[12px] max-w-[200px] p-[18px]  dark:bg-[#151722] rounded-[25px] mt-[10px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]">
            <header className="px-18px flex justify-between items-center mb-[8px]">
                <div className={color ? 'w-[12px] h-[12px] rounded-full ' + colorString : 'w-[12px] h-[12px] rounded-full bg-[#3A81C2]'}></div>
                <button className="flex">
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] mr-[2px] rounded-full bg-[#77787F]"></div>
                    <div className="w-[7px] h-[7px] rounded-full bg-[#77787F]"></div>
                </button>
            </header>
                <img className={imageUrl ? "w-full rounded-[25px] max-h-[150px] cover my-[10px]" : "w-full rounded-[25px] max-h-[150px] cover" } src={imageUrl || ''} />
            <h1 className="tranisition-all text-[20px] dark:text-white font-bold mb-[12px] truncate ...">{title}</h1>
            <p className="tranisition-all text-[14px] font-light dark:text-[#A1A2A7] mb-[20px] noteContent">{noteContent}</p>
            <p className="tranisition-all text-[10px] mb-[6px] font-bold dark:text-[white]" >{dateCreated}</p>
        </div>
    );
};

export default Note;