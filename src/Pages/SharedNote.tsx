import React, {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import OptionsMenu from '../Components/OptionsMenu';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import {motion} from 'framer-motion';
import ViewMobileImage from '../Components/ViewMobileImage'


interface SharedNoteProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    match: {params: {noteId: string, userId: string}};
}


const SharedNote : React.FC<SharedNoteProps> = ({history, match}) => {
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [viewImageIsShowing, setViewImageIsShowing] = useState<boolean>(false);
    useEffect(() => {
        const fetchNote = async () => {
            const apiEndpoint = `http://localhost:4000/api/v1/notes/sharedNote/${match.params.noteId}`;
            console.log(match.params)
            try {
                const {data} = await axios.get(apiEndpoint);
                console.log(data);
                setTitle(data.title);
                setNoteContent(data.noteContent);
                setSelectedColor(data.selectedColor);
                setDateCreated(data.dateCreated);
                setImageUrl(data.imageUrl || '');


            } catch (error) {
                alert("Link is invalid");
                history.push('/');
            }
        }
        fetchNote();

    }, [])

    const onDiscardNoteButtonClick = () => {
        history.replace('/home');
    }
    return (<>
        {viewImageIsShowing && <ViewMobileImage setViewImageIsShowing={setViewImageIsShowing} imageUrl={imageUrl}/>}
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-y-auto">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}  className="flex justify-between px-[20px] pt-[15px] mb-[25px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
            </motion.div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="dark:bg-[#151722] mx-[20px] pt-[20px] rounded-[30px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]">
                <p className="text-[31px] dark:text-white font-bold bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] mb-[5px]">{title}</p>
                <p className="px-[20px] text-[#56595F] font-bold mb-[25px]">{dateCreated} | {noteContent ? noteContent.split(' ').length : 0} words</p>
                <div className="text-[20px] dark:text-white bg-transparent px-[20px] placeholder:text-[#56595F] focus:outline-[0] max-w-[100%] w-full viewNoteTextArea">
                    {imageUrl && 
                            <figure className='w-full flex items-center justify-start h-[150px] mb-[15px]'>
                                <motion.img layoutId={"1"} onClick={() => setViewImageIsShowing(true)} src={imageUrl} className='h-full max-w-[90%] object-contain rounded-[20px] cursor-pointer' />
                            </figure>
                        }
                    {noteContent}
                </div>
            </motion.div>
        </div>
    </>
    );
}

export default SharedNote;