import React, {useEffect, useState, ChangeEvent} from 'react';
import profilePic from '../images/ronaldprofilepic1.png';
import darkIcon from '../images/DarkModeSvg.svg';
import lightIcon from '../images/SunSvg.svg';
import jwtDecode from 'jwt-decode';
import searchIcon from '../images/searchIcon.svg';
import ContentButton from '../Components/ContentButton';
import noNotesImage from '../images/noNotes.svg';
import addIcon from '../images/addIcon.svg';
import Note from '../Components/Note';
import axios from 'axios';
import Loader from '../Components/Loader';
import NoteOptions from '../Components/NoteOptions';
import {motion} from 'framer-motion';

interface DashboardProps {
    history: {push : (routeName: string) => void,  replace : (routeName: string) => void}
}
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

const Dashboard : React.FC<DashboardProps> = ({history}) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNoteId, setCurrentNoteId] = useState<string>('');
    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [noteOptionsIsShowing, setNoteOptionsIsShowing] = useState<boolean>(false);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectedContentButton, setSelectedContentButton] = useState<string>("All notes")
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({_id: '', firstName: ''});
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const darkModeButtonClasses = "w-[93px] h-[45px] rounded-[22.5px] bg-[#BFBFBF] dark:bg-[#000000] mr-[15px] darkModeButton ";
    const [width, setWidth] = useState<number>(window.innerWidth);

    const onDarkModeButtonClick = () => {
        setIsDarkTheme(!isDarkTheme);
        const htmlElement = document.querySelector('html');
        if (htmlElement){
            htmlElement.classList.toggle('dark');
        }
    }
    const onNewNoteButtonClick = () => {
        history.push('/newNote');
    }
    const onSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setSearchValue(input);

        // Filter the notes
        if (searchValue) {
            const filtered = notes.filter(note => {
                return note.title.toLowerCase().includes(input.toLowerCase()) || note.noteContent.toLowerCase().includes(input.toLowerCase());
            })
            setFilteredNotes(filtered)
        }
    }
    const removeNote = (id: string) => {
        const newArray = filteredNotes.filter(note => note._id !== id);
        setFilteredNotes(newArray);
        setNotes(newArray);
    }
    useEffect(() => {
        function changeToMobileScreen() {
            if (window.innerWidth > 1023) {
                history.push('/desktopDashboard');
            }
        }
        window.addEventListener('resize',changeToMobileScreen);
        const fetchAllNotes = async (userObject: {_id: string, firstName: string}) => {
            try {
                setLoading(true);
                const apiEndpoint = `http://localhost:4000/api/v1/notes/${userObject._id}`;
                const {data} = await axios.get(apiEndpoint);
                setNotes(data);
                setFilteredNotes(data.reverse());
                console.log(data)
            } catch (error) {
                
            }finally {
                setLoading(false);
            }

        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/signIn');
            } else{
                const user = jwtDecode(token) as {_id: string, firstName: string};
                setUser(user);
                fetchAllNotes(user);
                console.log(user);
            }
        } catch(error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');

            }
        }
        
        
    }, [])
    return (
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-hidden">
            <motion.div exit={{opacity: 0}} className="relative container mx-auto h-full">
                <section className="flex justify-between pt-[15px]">
                    <motion.p initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.3, duration: 0.3} }} className="text-[32px] dark:text-white pl-[25px] transition-all"><span className="font-bold">Note</span>ly</motion.p>
                    <div className="flex items-center pr-[25px]">
                        <motion.button initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.45, duration: 0.3}}} className={isDarkTheme? darkModeButtonClasses : darkModeButtonClasses + 'active'} onClick={onDarkModeButtonClick}>
                            <div className="w-[35px] h-[35px] bg-[white] rounded-full ml-[7.5px] flex items-center justify-center">
                                <img alt="icon" className="darkModeIcon" src={darkIcon} /> 
                                <img alt="icon" className="lightModeIcon" src={lightIcon} /> 
                            </div>
                        </motion.button>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.60, duration: 0.3} }} className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            {avatarUrl && <img alt="icon" className="w-full h-full" src={profilePic}/>}
                            {!avatarUrl && <div className='w-full h-full bg-[#8d6e63] flex items-center justify-center text-[27px] text-white font-semibold'><span>{user.firstName?.slice(0,1).toUpperCase()}</span></div>}
                        </motion.div>
                    </div>
                </section>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.85, duration: 0.3} }} className="text-[32px] pl-[25px] dark:text-white transition-all flex"><span className='relative top-[13px]'>Hi {user.firstName}</span> <motion.div style={{originY: 0.9, originX: 0.9}} animate={{rotate: [0, -45, 0], y: [0, -10, 0]}} transition={{duration: 1.3, delay: 1.4}} className="text-[45px]">👋</motion.div></motion.div>
                <motion.div initial={{opacity: 0, scale: 0.85}} animate={{opacity: 1, scale: 1, transition: {delay: 1.3}}} className="transition-all mx-[28px] w-[calc(100% - 56px)] bg-[white] dark:bg-[#1E1D2C] h-[54px] rounded-[15px] mt-[18px] px-[18px] flex items-center searchInputGroup">
                    <img alt="icon" className="w-[30px] h-[30px] mr-[17px] fill-[white]" src={searchIcon} />
                    <input className="transition-all w-full h-[39px] bg-transparent focus:outline-[0] text-[22px] text-[#5c426c] dark:text-[#48485D] placeholder:text-[grey] dark:placeholder:text-[#48485D] font-bold" placeholder="Search your notes" onChange={onSearchChange} value={searchValue}/>
                </motion.div>
                {/* <section className="w-full px-[28px] flex flex-row justify-around mt-[14px] contentButtonContainer">
                    <ContentButton selected={selectedContentButton === "All notes" ? true : false} title="All notes" onClick={() => setSelectedContentButton("All notes")}/>
                </section> */}
                {(!loading && !notes.length) && <motion.section initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center">
                    <img alt="icon" src={noNotesImage} className="max-w-[250px] mt-[30px]" />
                    <p className="text-[18px] mt-[20px] font-bold dark:text-white">Create your first note</p>
                </motion.section>}
                {loading && <Loader />}
                {!loading && <> <motion.section initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1, transition:{delay: 1.8, duration: 0.3}}} className="px-[28px] grid grid-cols-2 sm:hidden gap-[15px]  pt-[20px] h-[calc(100vh-224.5px)] mt-[8px] overflow-y-auto rounded-2xl ">
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 2 === 0){
                                return note.imageUrl ? <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} imageUrl={note.imageUrl} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> : <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 2 === 1){
                                return note.imageUrl ? <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} imageUrl={note.imageUrl} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> : <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> 
                            }
                        })}
                    </div>
                </motion.section>
                <motion.section initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1, transition:{delay: 1.8, duration: 0.3}}} className="px-[28px] hidden sm:grid sm:grid-cols-3 gap-[15px] pb-[20px] pt-[20px] overflow-y-auto h-[calc(100vh-224.5px)]">
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 === 0){
                                return note.imageUrl ? <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} imageUrl={note.imageUrl} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> : <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 === 1){
                                return note.imageUrl ? <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} imageUrl={note.imageUrl} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> : <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 === 2){
                                return <Note setCurrentTitle={setCurrentTitle} history={history} setCurrentNoteId={setCurrentNoteId} setNoteOptionsIsShowing={setNoteOptionsIsShowing} color={note.selectedColor} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} _id={note._id} userId={note.userId} imageUrl={note.imageUrl ? note.imageUrl : ''}/> 
                            }
                        })}
                    </div>
                </motion.section> </>}
            </motion.div>
                <motion.button exit={{opacity: 0}} className="absolute w-[84px] h-[84px] rounded-full bg-[white] dark:bg-[#1E1D2C] flex items-center justify-center bottom-[42px] right-[42px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]" initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 2, duration: 0.2}}} onClick={onNewNoteButtonClick}>
                    <img alt="icon" src={addIcon}/>
                </motion.button>
                <NoteOptions history={history} removeNote={removeNote} userId={user._id} currentNoteId={currentNoteId} noteOptionsIsShowing={noteOptionsIsShowing} setNoteOptionsIsShowing={setNoteOptionsIsShowing} currentTitle={currentTitle}/>
        </div>
    );
}
// Assign the values of 1 and 2 for selected and 
export default Dashboard;