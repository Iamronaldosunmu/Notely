import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import OptionsMenu from '../Components/OptionsMenu';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import RouteComponentProps, { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';

interface ViewDesktopNoteProps {
    historyObject: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    setViewImageIsShowing: Dispatch<SetStateAction<boolean>>;
}
interface matchProps {
    userId: string;
    noteId: string;
}

const ViewDesktopNote : React.FC<ViewDesktopNoteProps> = ({historyObject: history, setViewImageIsShowing}) => {
    const match : matchProps = useParams();
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const [imageUrl, setImageUrl] = useState<string>('');
    useEffect(() => {
        // console.log(match.url)
        const fetchNote = async () => {
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${match.userId}/${match.noteId}`;
            // console.log(apiEndpoint);
            try {
                const {data} = await axios.get(apiEndpoint);
                setTitle(data.title);
                setNoteContent(data.noteContent);
                setSelectedColor(data.selectedColor);
                setDateCreated(data.dateCreated);
                if (data.imageUrl) {
                    setImageUrl(data.imageUrl)
                }
            } catch (error) {
                alert("An error occured");
                history.push('/dashboard');
            }
            // console.log(apiEndpoint);
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
                // console.log(user);
            }
        } catch(error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');

            }
        }
    }, [match])
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setTitle(input);
    }
    const onNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.currentTarget.value;
        setNoteContent(input);
    }
    const handleSubmit = async () => {
        history.push(`../../../desktopDashboard/editNote/${match.userId}/${match.noteId}`);
    }
    const onDiscardNoteButtonClick = () => {
        history.replace('/desktopDashboard');
    }
    
    return (
        <div className="dark:bg-[#0E121A] bg-[#f2f2f2] h-full w-full transition-all overflow-hidden pb-[20px]">
            <div className="dark:bg-[#151722] bg-white pt-[10px] rounded-[30px]  pb-[20px]">
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
                <p className="text-[20px] dark:text-white bg-transparent px-[30px] pr-[15px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopViewNoteArea overflow-y-auto desktopViewNoteScrollbar">
                    {imageUrl && 
                        <figure className='w-full flex items-center justify-start h-[150px] mb-[15px]'>
                            <motion.img layoutId={"1"} onClick={() => setViewImageIsShowing(true)} src={imageUrl} className='h-full max-w-[90%] rounded-[20px]' />
                        </figure>
                    }
                    <p>
                    {noteContent}
                    </p>
                </p>
            </div>
        </div>
    );
};

export default ViewDesktopNote;