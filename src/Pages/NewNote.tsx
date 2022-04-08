import React, {useEffect, useState} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import OptionsMenu from '../Components/OptionsMenu';
import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import ViewMobileImage from '../Components/ViewMobileImage'


interface NewNoteProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void}
}

interface matchProps {
    userId: string;
    noteId: string;
}


const NewNote : React.FC<NewNoteProps> = ({history}) => {
    const match : matchProps= useParams();
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [viewImageIsShowing, setViewImageIsShowing] = useState<boolean>(false);
    const textAreaClasses = "text-[24px] dark:text-white bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full ";

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
            const payload = {title, noteContent, dateCreated, selectedColor, imageUrl};
            const apiEndpoint = `https://notelyapp1.herokuapp.com/api/v1/notes/${user._id}`;
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
    return (<>
        {viewImageIsShowing && <ViewMobileImage setViewImageIsShowing={setViewImageIsShowing} imageUrl={imageUrl}/>}
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-y-auto">
            <div className="flex justify-between px-[20px] pt-[15px] mb-[35px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <p className="dark:text-white text-[24px] font-bold">New note</p>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
            <input className="text-[34px] dark:text-white font-bold bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]" placeholder="Add a title..." value={title} onChange={onTitleChange}/>
            <p className="px-[20px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
            <div>
            {imageUrl && 
                            <figure className='w-full flex items-center justify-start px-[20px] h-[150px] mb-[15px]'>
                                <motion.img layoutId={"1"} onClick={() => setViewImageIsShowing(true)} src={imageUrl} className='h-full max-w-[90%] object-contain rounded-[20px] cursor-pointer' />
                            </figure>
                        }
            <textarea className={imageUrl ? textAreaClasses + 'noteTextAreaWithImage' : textAreaClasses + 'noteTextArea'} placeholder="Type something..." value={noteContent} onChange={onNoteContentChange}/>
            </div>
            <OptionsMenu onDiscardButtonClick={onDiscardNoteButtonClick} selectedColor={selectedColor} setSelectedColor={setSelectedColor} history={history} setImageUrl={setImageUrl} noteId={match.noteId} newNote={true}/>
        </div>
    </>
    );
}
export default NewNote;