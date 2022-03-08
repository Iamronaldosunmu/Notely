import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DesktopOptionsMenu from '../Components/DesktopOptionsMenu';
import {useHistory, useParams} from 'react-router-dom';

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

interface EditDesktopNoteProps {
    historyObject: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    // match: {params: {noteId: string, userId: string}};
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
}
interface matchProps {
    userId: string;
    noteId: string;
}


const EditDesktopNote : React.FC<EditDesktopNoteProps> = ({notes, setNotes, historyObject}) => {
    const history = useHistory();
    const match : matchProps = useParams();
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    useEffect(() => {
        // console.log(history);
        console.log(match);
        const fetchNote = async () => {
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${match.userId}/${match.noteId}`;
            try {
                const {data} = await axios.get(apiEndpoint);
                setTitle(data.title);
                setNoteContent(data.noteContent);
                setSelectedColor(data.selectedColor);

            } catch (error) {
                alert("An error occured");
                console.log(error);
                history.push('/desktopDashboard');
            }
        }
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
                fetchNote();
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
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${match.userId}/${match.noteId}`;
            try {
                const {data : noteEdited} = await axios.patch(apiEndpoint, payload);
                const notesExcludingEditedNote = notes.filter(note => note._id != noteEdited._id);
                const newNotes = [ noteEdited, ...notesExcludingEditedNote]
                setNotes(newNotes)
                history.push('/desktopDashboard');
            } catch (error) {
                console.log(error);
            }
            // console.log(payload);
            // Send the payload to the backend to save to the database
        }
    }
    const onDiscardNoteButtonClick = () => {
        if (window.confirm('Are you sure you want to discard your changes?')) {
            history.replace('/desktopDashboard');
        }
    }
    return (
        <div className="dark:bg-[#0E121A] relative h-full w-full transition-all overflow-hidden">
            <div className="dark:bg-[#151722] pt-[10px] rounded-[30px] ">
            <div className="flex justify-between px-[30px] pt-[15px] mb-[15px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
            <input className="text-[30px] dark:text-white font-bold bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[30px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <textarea className="text-[19px] dark:text-white bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopEditNoteArea mb-[75px]" placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
            <DesktopOptionsMenu onDiscardButtonClick={onDiscardNoteButtonClick} selectedColor={selectedColor} setSelectedColor={setSelectedColor} history={historyObject}/>
            </div>
        </div>
    );
}
export default EditDesktopNote;