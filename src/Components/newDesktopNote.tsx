import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import jwtDecode from 'jwt-decode';
import {useHistory, useParams} from 'react-router-dom';

import axios from 'axios';
import DesktopOptionsMenu from './DesktopOptionsMenu';
import { match } from 'assert';
interface Note {
    _id: string;
    userId: string;
    _v?: number;
    selectedColor: string;
    title: string;
    noteContent: string;
    dateCreated: string;
    imageUrl?: string;
}

interface NewDesktopNote {
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
}
interface matchProps {
    userId: string;
    noteId: string;
}


const NewDesktopNote : React.FC<NewDesktopNote> = ({ notes, setNotes}) => {
    useEffect(() => {
        const date = new Date();
        if (!dateCreated) {
            setDateCreated(`${date.toLocaleString('en-us', {  weekday: 'long' }).slice(0, 3)} ${date.toLocaleString('en-us', {  month: 'long' }).slice(0, 3)} ${date.getDate()}, ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`);
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/signIn');
            } else{
                const user = jwtDecode(token) as {};
                setUser(user);
                console.log(user);
            }
        } catch(error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');

            }
        }
    }, [])
    const match : matchProps = useParams();
    const history = useHistory();
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageCloudinaryId, setImageCloudinaryId] = useState<string>('');
    const textareaClasses = "text-[19px] dark:text-white bg-transparent px-[30px] pb-[60px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopViewNoteScrollbar h-[calc(100%-200px)] desktopTextArea";
    const onDiscardNoteButtonClick = () => {
        if (window.confirm('Are you sure you want to discard this note?')) {
            history.replace('/desktopDashboard');
        }
    }
    const handleSubmit = async () => {
        if (title && noteContent) {
            const payload = {title, noteContent, dateCreated, selectedColor, imageUrl, imageCloudinaryId};
            console.log(payload);
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${user._id}`;
            try {
                const result = await axios.post(apiEndpoint, payload);
                const desktopNotes = [...notes];
                desktopNotes.unshift(result.data);
                setNotes(desktopNotes);
                history.push('/desktopDashboard')
                // window.location.replace('/desktopDashboard');
            } catch (error) {
                console.log(error);
            }
            console.log(payload);
            // Send the payload to the backend to save to the database
        }
    }
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setTitle(input);
    }
    const onNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.currentTarget.value;
        setNoteContent(input);
    }
    return (
        <div className='relative h-full w-full transition-all overflow-hidden'>
            <div className="flex justify-between px-[30px] pt-[20px] mb-[15px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <p className="dark:text-white text-[21px] font-bold">New note</p>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
            <input className="text-[30px] dark:text-white font-bold bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] w-full max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[30px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <div className="relative text-[19px] dark:text-white bg-transparent placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopEditNoteArea desktopViewNoteScrollbar flex flex-col">
                {imageUrl &&  
                    <figure className='absolute top-0 w-full flex items-center px-[30px] justify-start h-[150px] mb-[15px]'>
                        <img src={imageUrl} className='h-full max-w-[90%] rounded-[20px]'/>
                    </figure>
                    }
                <textarea className={imageUrl ? textareaClasses + ' mt-[165px]' : textareaClasses + ' h-[calc(100%-55px)]'} placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
                <DesktopOptionsMenu onDiscardButtonClick={onDiscardNoteButtonClick} selectedColor={selectedColor} setSelectedColor={setSelectedColor} noteId={match.noteId} setImageUrl={setImageUrl} newNote={true} setImageCloudinaryId={setImageCloudinaryId}/>
            </div>
        </div>
    )
};
export default NewDesktopNote;