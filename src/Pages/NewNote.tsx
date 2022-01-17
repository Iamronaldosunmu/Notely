import React, {useEffect, useState} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';

interface NewNoteProps {
    history: {push : (routeName: string) => void, goBack : () => {}}
}

const NewNote : React.FC<NewNoteProps> = ({history}) => {
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    useEffect(() => {
        const date = new Date();
        if (!dateCreated) {
            setDateCreated(`${date.toLocaleString('en-us', {  weekday: 'long' }).slice(0, 3)} ${date.toLocaleString('en-us', {  month: 'long' }).slice(0, 3)} ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`);
        }
    }, [])
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setTitle(input);
    }
    const onNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.currentTarget.value;
        setNoteContent(input);
    }
    const handleSubmit = () => {
        const payload = {title, noteContent, currentDate: dateCreated};
        console.log(payload);
        // Send the payload to the backend to save to the database
        history.push('/dashboard')
    }
    return (
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-y-auto">
            <div className="flex justify-between px-[20px] pt-[15px] mb-[35px]">
                <button onClick={() => history.goBack()}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <p className="dark:text-white text-[24px] font-bold">New note</p>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                    
                    
                    
                </button>
            </div>
            <input className="text-[34px] dark:text-white font-bold bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[20px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <textarea className="text-[24px] dark:text-white bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full noteTextArea" placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
        </div>
    );
}
export default NewNote;