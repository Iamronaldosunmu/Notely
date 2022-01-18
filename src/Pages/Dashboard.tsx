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
interface DashboardProps {
    history: {push : (routeName: string) => void}
}
interface Note {
    color: string;
    title: string;
    noteContent: string;
    dateCreated: string;
    imageUrl?: string;
}

const Dashboard : React.FC<DashboardProps> = ({history}) => {
    const [notes, setNotes] = useState<Note[]>([
        {
        color: '#3A81C2', 
        title: 'Note Title', 
        noteContent: 'This ishat I decided to write for the notely design during my freetime, it could have been much longer than this, but we thank God', 
        dateCreated: "Thu Jan 21, 18:24", 
        imageUrl: "https://media-exp1.licdn.com/dms/image/C4D03AQHrZzvVSGQaHA/profile-displayphoto-shrink_100_100/0/1636403300127?e=1647475200&v=beta&t=GGDZGlPhIOvLgqtsMWBPnMQShKzVxsqLjw8vpO3XUiY"
        }, 
        {
        color: '#3A81C2', 
        title: 'Note Title', 
        noteContent: 'This is an example of a random note that I decided to write for the notely design during my freetime, it could have been much longer than this, but we thank God', 
        dateCreated: "Thu Jan 21, 18:24"
        }, 
        {
        color: '#3A81C2', 
        title: 'Note Title', 
        noteContent: 'This is an example of a random note that I decided to write for the notely design during my freetime, it could have been much longer than this, but we thank God', 
        dateCreated: "Thu Jan 21, 18:24"
        }, 
        {
        color: '#3A81C2', 
        title: 'Note Title', 
        noteContent: 'This is an example of a random note that I decided to write for the notely design during my freetime, it could have been much longer than this, but we thank God', 
        dateCreated: "Thu Jan 21, 18:24"
        } 
]);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectedContentButton, setSelectedContentButton] = useState<string>("All notes")
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const darkModeButtonClasses = "w-[93px] h-[45px] rounded-[22.5px] bg-[#BFBFBF] dark:bg-[#000000] mr-[15px] darkModeButton ";
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
    useEffect(() => {
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
    return (
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all overflow-y-auto">
            <div className="relative container mx-auto h-full">
                <section className="flex justify-between pt-[15px]">
                    <p className="text-[32px] dark:text-white pl-[25px] transition-all"><span className="font-bold">Note</span>ly</p>
                    <div className="flex items-center pr-[25px]">
                        <button className={isDarkTheme? darkModeButtonClasses : darkModeButtonClasses + 'active'} onClick={onDarkModeButtonClick}>
                            <div className="w-[35px] h-[35px] bg-[white] rounded-full ml-[7.5px] flex items-center justify-center">
                                <img className="darkModeIcon" src={darkIcon} /> 
                                <img className="lightModeIcon" src={lightIcon} /> 
                            </div>
                        </button>
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img className="w-full h-full" src={profilePic}/>
                        </div>
                    </div>
                </section>
                <p className="text-[32px] pl-[25px] dark:text-white transition-all">Hi {user.firstName} <span className="text-[45px]">👋</span></p>
                <div className="mx-[28px] w-[calc(100% - 56px)] bg-[white] dark:bg-[#1E1D2C] h-[54px] rounded-[15px] mt-[18px] px-[18px] flex items-center searchInputGroup">
                    <img className="w-[30px] h-[30px] mr-[17px] fill-[white]" src={searchIcon} />
                    <input className="transition-all w-full h-[39px] bg-transparent focus:outline-[0] text-[22px] text-[#5c426c] dark:text-[#48485D] placeholder:text-[grey] dark:placeholder:text-[#48485D] font-bold" placeholder="Search your notes" onChange={onSearchChange} value={searchValue}/>
                </div>
                <section className="w-full px-[28px] flex flex-row justify-around mt-[14px] contentButtonContainer">
                    <ContentButton selected={selectedContentButton == "All notes" ? true : false} title="All notes" onClick={() => setSelectedContentButton("All notes")}/>
                    <ContentButton selected={selectedContentButton == "Folders" ? true : false} title="Folders" onClick={() => setSelectedContentButton("Folders")}/>
                </section>
                {!notes.length && <section className="flex flex-col items-center">
                    <img src={noNotesImage} className="max-w-[250px] mt-[30px]" />
                    <p className="text-[18px] mt-[20px] font-bold dark:text-white">Create your first note</p>
                </section>}
                <section className="px-[28px] grid grid-cols-2 sm:hidden gap-[15px] pb-[20px]">
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 2 == 0){
                                return <Note color={note.color} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 2 == 1){
                                return <Note color={note.color} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)}/> 
                            }
                        })}
                    </div>
                </section>
                <section className="px-[28px] hidden sm:grid sm:grid-cols-3 gap-[15px] pb-[20px]">
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 == 0){
                                return <Note color={note.color} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 == 1){
                                return <Note color={note.color} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)}/> 
                            }
                        })}
                    </div>
                    <div className="flex flex-col">
                        {filteredNotes.map(note => {
                            if (filteredNotes.indexOf(note) % 3 == 2){
                                return <Note color={note.color} title={note.title} noteContent={note.noteContent} dateCreated={note.dateCreated} key={filteredNotes.indexOf(note)} imageUrl={note.imageUrl ? note.imageUrl : ''}/> 
                            }
                        })}
                    </div>
                </section>
            </div>
                <button className="absolute w-[84px] h-[84px] rounded-full bg-[white] dark:bg-[#1E1D2C] flex items-center justify-center bottom-[42px] right-[42px] shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)]" onClick={onNewNoteButtonClick}>
                    <img src={addIcon}/>
                </button>
        </div>
    );
}
// Assign the values of 1 and 2 for selected and 
export default Dashboard;