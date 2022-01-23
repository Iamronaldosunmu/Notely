import React, {useState, useEffect} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import OptionsMenu from '../Components/OptionsMenu';

interface EditNoteProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void}
}

const EditNote : React.FC<EditNoteProps> = ({history}) => {
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
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
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setTitle(input);
    }
    const onNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.currentTarget.value;
        setNoteContent(input);
    }
    const handleSubmit = async () => {
        if (title && noteContent) {
            const payload = {title, noteContent, dateCreated, selectedColor};
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${user._id}`;
            try {
                const result = await axios.post(apiEndpoint, payload);
                console.log(result);
                history.push('/dashboard');
            } catch (error) {
                console.log(error);
            }
            console.log(payload);
            // Send the payload to the backend to save to the database
        }
    }
    const onDiscardNoteButtonClick = () => {
        if (window.confirm('Are you sure you want to discard this note?')) {
            history.replace('/dashboard');
        }
    }
    return (
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-y-auto">
            <div className="flex justify-between px-[20px] pt-[15px] mb-[35px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
            <input className="text-[34px] dark:text-white font-bold bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[20px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <textarea className="text-[24px] dark:text-white bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full noteTextArea" placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
            <OptionsMenu onDiscardButtonClick={onDiscardNoteButtonClick} selectedColor={selectedColor} setSelectedColor={setSelectedColor} history={history}/>
        </div>
    );
}
export default EditNote;