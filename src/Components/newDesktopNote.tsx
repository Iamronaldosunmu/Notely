import React, {useState, useEffect} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import jwtDecode from 'jwt-decode';

import axios from 'axios';
interface NewDesktopNote {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void}
}
const NewDesktopNote : React.FC<NewDesktopNote> = ({history}) => {
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
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const onDiscardNoteButtonClick = () => {
        if (window.confirm('Are you sure you want to discard this note?')) {
            history.replace('/desktopDashboard');
        }
    }
    const handleSubmit = async () => {
        if (title && noteContent) {
            const payload = {title, noteContent, dateCreated, selectedColor};
            console.log(payload);
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${user._id}`;
            try {
                const result = await axios.post(apiEndpoint, payload);
                console.log(result);
                history.push('/desktopDashboard');
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
        <div className='h-full'>
            <div className="flex justify-between px-[30px] pt-[20px] mb-[15px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <p className="dark:text-white text-[21px] font-bold">New note</p>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
            <input className="text-[30px] dark:text-white font-bold bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[30px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <textarea className="text-[20px] dark:text-white bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopNoteTextArea" placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
        </div>
    )
};
export default NewDesktopNote;