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
import {useHistory} from 'react-router-dom';

interface ViewDesktopNoteProps {
    setViewImageIsShowing: Dispatch<SetStateAction<boolean>>;
    setCurrentImageUrl: Dispatch<SetStateAction<string>>;
}
interface matchProps {
    userId: string;
    noteId: string;
}

const ViewDesktopNote : React.FC<ViewDesktopNoteProps> = ({ setViewImageIsShowing, setCurrentImageUrl}) => {
    const history = useHistory()
    const match : matchProps = useParams();
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const [imageUrl, setImageUrl] = useState<string>('');
    useEffect(() => {
        let isActive = true;
        const fetchNote = async () => {
            const apiEndpoint = `http://localhost:4000/api/v1/notes/${match.userId}/${match.noteId}`;
            try {
                const {data} = await axios.get(apiEndpoint);
                if (isActive){
                    setTitle(data.title);
                    setNoteContent(data.noteContent);
                    setSelectedColor(data.selectedColor);
                    setDateCreated(data.dateCreated);
                    setImageUrl(data.imageUrl || '');
                    setCurrentImageUrl(data.imageUrl || '');
                    
                }
            } catch (error) {
                alert("An error occured");
                history.push('/dashboard');
            }
            // console.log(apiEndpoint);
        }
        const date = new Date();
        if (!dateCreated && isActive) {
            setDateCreated(`${date.toLocaleString('en-us', {  weekday: 'long' }).slice(0, 3)} ${date.toLocaleString('en-us', {  month: 'long' }).slice(0, 3)} ${date.getDate()}, ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`);
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/signIn');
            } else{
                const user = jwtDecode(token) as {};
                if (isActive) setUser(user);
                fetchNote();
                // console.log(user);
            }
        } catch(error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');

            }
        }
        return () => {isActive = false}
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
        <div className="dark:bg-[#0E121A] bg-[#f2f2f2] h-full w-full transition-all  pb-[20px]">
            <div className="dark:bg-[#151722] bg-white pt-[10px] rounded-[30px]  pb-[20px]">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.15}}} exit={{opacity: 0, transition: {duration: 0.15}}} className="flex justify-between px-[30px] pt-[15px] mb-[15px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <button className="dark:text-white text-[21px] font-bold" onClick={handleSubmit}>
                    Edit
                </button>
            </motion.div>
                <motion.p 
                    initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.15}}} exit={{opacity: 0, transition: {duration: 0.15}}}
                    className="text-[30px] dark:text-white font-bold bg-transparent px-[30px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]">{title}
                </motion.p>
                <motion.p 
                    initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.15}}} exit={{opacity: 0, transition: {duration: 0.15}}}
                    className="px-[30px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words
                </motion.p>
                <motion.div 
                initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.15}}} exit={{opacity: 0, transition: {duration: 0.15}}}
                className="text-[20px] dark:text-white bg-transparent px-[30px] pr-[15px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full desktopViewNoteArea  desktopViewNoteScrollbar">
                    {imageUrl && 
                        <figure className='w-full flex items-center justify-start h-[150px] mb-[15px]'>
                            <motion.img layoutId={"1"} onClick={() => setViewImageIsShowing(true)} src={imageUrl} className='h-full max-w-[90%] object-contain rounded-[20px]' />
                        </figure>
                    }
                    <p>
                    {noteContent}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewDesktopNote;