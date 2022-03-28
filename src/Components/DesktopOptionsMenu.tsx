import React, {useState, Dispatch, SetStateAction, useRef, useLayoutEffect} from 'react';
import ColorCircle from './ColorCircle';
import expandIcon from '../images/expandIcon.svg';
import lightModeExpandIcon from '../images/lightModeExpandIcon.svg';
import trashIcon from '../images/icons8-trash.svg';
import whiteTrashIcon from '../images/whiteTrashIcon.svg';
import whiteUploadImageIcon from '../images/whiteUploadImageIcon.svg';
import uploadImageIcon from '../images/upload-image.svg';
import axios from 'axios';
interface DesktopOptionsMenuProps {
    selectedColor: string;
    setSelectedColor: Dispatch<SetStateAction<string>>;
    setImageUrl: Dispatch<SetStateAction<string>>;
    onDiscardButtonClick: () => void;
    noteId: string;
    newNote?: boolean;
    setImageCloudinaryId?: Dispatch<SetStateAction<string>>;
}

const DesktopOptionsMenu : React.FC<DesktopOptionsMenuProps> = ({selectedColor, setSelectedColor, onDiscardButtonClick, noteId, setImageUrl, newNote, setImageCloudinaryId}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const optionsContainerClasses = "absolute w-full bottom-[-139px] p-[10px] pl-[15px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] bg-white dark:bg-[#151722] rounded-t-[25px] optionsContainer";
    const [fileSelected, setFileSelected] = React.useState<string | Blob | File>();

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!newNote && e.target.files){
            let file = e.target.files[0];
            let formData = new FormData;
            formData.append('image', e.target.files[0]);
            formData.append('noteId', noteId);
            const result = await axios.post('http://localhost:4000/api/v1/image', formData);
            console.log(result.data);
            setImageUrl(result.data.secure_url)
        }
        else if (newNote && e.target.files) {
            let file = e.target.files[0];
            let formData = new FormData;
            formData.append('image', e.target.files[0]);
            const result = await axios.post('http://localhost:4000/api/v1/image/newImage', formData);
            console.log(result.data);
            setImageUrl(result.data.secure_url);
            if (setImageCloudinaryId) setImageCloudinaryId(result.data.public_id)
        }
    }
    return (
        <div className={isCollapsed ? optionsContainerClasses : optionsContainerClasses + ' expanded'} >
            <div className=" flex justify-between mb-[10px]">
                <div className="max-w-[calc(100% - 110px)] overflow-hidden rounded-r-[10px]">
                    <div className="whitespace-nowrap overflow-y-auto p-[10px] pr-[0px] rounded-r-[20px] colorCircleContainer">
                        <ColorCircle setSelectedColor={setSelectedColor} color='#3269ff' selected={selectedColor == '#3269ff'} />
                        <ColorCircle setSelectedColor={setSelectedColor} color='#ffd947' selected={selectedColor == '#ffd947'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='grey' selected={selectedColor == 'grey'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#ae3b76'selected={selectedColor == '#ae3b76'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#fe7745'selected={selectedColor == '#fe7745'}/>
                        <ColorCircle setSelectedColor={setSelectedColor} color='#0e121a'selected={selectedColor == '#0e121a'}/>
                    </div>
                </div>
                <button className="ml-[14px] mr-[8px] flex items-center justify-center" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {document.querySelector('html')?.classList.contains('dark') ? <img className={isCollapsed ? "w-[20px] expandIcon" : "w-[20px] expandIcon expanded"} src={expandIcon} /> : <img className={isCollapsed ? "w-[20px] expandIcon" : "w-[20px] expandIcon expanded"} src={lightModeExpandIcon} />}
                </button>
            </div>
            <div>
                <button className="flex items-center mb-[20px] w-full" onClick={onDiscardButtonClick} >
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="mr-[30px] w-[30px] " src={whiteTrashIcon}/> : <img className="mr-[30px] w-[30px] " src={trashIcon}/> }

                    <p className="dark:text-[#86888C] text-[18px] font-bold">Discard Note</p>
                </button>
                <button  className="flex items-center mb-[20px] w-full">
                    {document.querySelector('html')?.classList.contains('dark') ? <img className="mr-[30px] w-[30px] " src={whiteUploadImageIcon}/> : <img className="mr-[30px] w-[30px] " src={uploadImageIcon}/> }
                    
                    <div className="dark:text-[#86888C] text-[18px] font-bold" onClick={() => document.getElementById('getFile')?.click()}>Upload an image</div>
                    <input type='file' accept=".jpg,.jpeg,.png" id="getFile" name="image" className='hidden' onChange={onFileChange}/>
                </button>
            </div>
        </div>
    );
}

export default DesktopOptionsMenu;