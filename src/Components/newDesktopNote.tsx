import React, {useState} from 'react';
import whiteBackIcon from '../images/whiteBackIcon.svg';
import whiteTickIcon from '../images/whiteTickIcon.svg';
import blackBackIcon from '../images/blackBackIcon.svg';
import blackTickIcon from '../images/blackTickIcon.svg';
import axios from 'axios';
interface NewDesktopNote {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void}
}
const NewDesktopNote : React.FC<NewDesktopNote> = ({history}) => {
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#3269ff');
    const onDiscardNoteButtonClick = () => {
        if (window.confirm('Are you sure you want to discard this note?')) {
            history.replace('/dashboard');
        }
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
    return (
        <div>
            <div className="flex justify-between px-[30px] pt-[25px] mb-[35px]">
                <button onClick={onDiscardNoteButtonClick}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px]" src={whiteBackIcon} alt="back Icon"/> : <img className="h-[28px]" src={blackBackIcon} alt="back Icon"/>}                    
                </button>
                <p className="dark:text-white text-[24px] font-bold">New note</p>
                <button onClick={handleSubmit}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="h-[28px] w-[35px]" src={whiteTickIcon} alt="tick Icon"/> : <img className="h-[28px] w-[35px]" src={blackTickIcon} alt="tick Icon"/>}                                       
                </button>
            </div>
        </div>
    )
};
export default NewDesktopNote;