import React, {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import OptionsMenu from '../Components/OptionsMenu';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import RouteComponentProps from 'react-router-dom';
interface ViewDesktopNoteProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    match: {params: {noteId: string, userId: string}, url: string};
}

const ViewDesktopNote : React.FC<ViewDesktopNoteProps> = ({history, match}) => {
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    useEffect(() => {
        console.log(match.url)
        const fetchNote = async () => {
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${match.params.userId}/${match.params.noteId}`;
            console.log(apiEndpoint);
            try {
                const {data} = await axios.get(apiEndpoint);
                setTitle(data.title);
                setNoteContent(data.noteContent);
                setSelectedColor(data.selectedColor);
                setDateCreated(data.dateCreated);

            } catch (error) {
                alert("An error occured");
                history.push('/dashboard');
            }
            console.log(apiEndpoint);
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
    }, [match.params])
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setTitle(input);
    }
    const onNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.currentTarget.value;
        setNoteContent(input);
    }
    const handleSubmit = async () => {
        history.push(`../../../desktopDashboard/editNote/${match.params.userId}/${match.params.noteId}`);
    }
    const onDiscardNoteButtonClick = () => {
        history.replace('/desktopDashboard');
    }
    return (
        <div className="dark:bg-[#0E121A] h-full w-full transition-all overflow-hidden pb-[20px]">
            <div className="dark:bg-[#151722] pt-[10px] rounded-[30px] ">
            <div className="flex justify-between px-[30px] pt-[15px] mb-[15px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <button className="dark:text-white text-[21px] font-bold" onClick={handleSubmit}>
                    Edit
                </button>
            </div>
                <p className="text-[30px] dark:text-white font-bold bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]">{title}</p>
                <p className="px-[30px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
                <p className="text-[20px] dark:text-white bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopViewNoteArea overflow-y-auto">{noteContent}</p>
            </div>
        </div>
    );
};

export default ViewDesktopNote;