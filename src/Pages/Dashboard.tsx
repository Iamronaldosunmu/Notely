import React, {useEffect, useState, ChangeEvent} from 'react';
import profilePic from '../images/ronaldprofilepic1.png';
import darkIcon from '../images/DarkModeSvg.svg';
import lightIcon from '../images/SunSvg.svg';
import jwtDecode from 'jwt-decode';
import searchIcon from '../images/searchIcon.svg';
import ContentButton from '../Components/ContentButton';
interface DashboardProps {
    history: {push : (routeName: string) => void}
}

const Dashboard : React.FC<DashboardProps> = ({history}) => {
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
    
    const onSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        setSearchValue(input);
    }
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/signIn');
            } else{
                const user = jwtDecode(token) as {};
                setUser(user);
            }
        } catch(error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');

            }
        }
    }, [])
    return (
        <div className="dark:bg-[#0E121A] h-screen w-screen transition-all">
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
            <div className="mx-[28px] w-[calc(100% - 56px)] bg-[#BFBFBF] dark:bg-[#1E1D2C] h-[54px] rounded-[15px] mt-[18px] px-[18px] flex items-center">
                <img className="w-[30px] h-[30px] mr-[17px] fill-[white]" src={searchIcon} />
                <input className="transition-all w-full h-[39px] bg-transparent focus:outline-[0] text-[22px] text-[white] dark:text-[#48485D] placeholder:text-[white] dark:placeholder:text-[#48485D] font-bold" placeholder="Search your notes" onChange={onSearchChange} value={searchValue}/>
                {/* TODO: Make sure to sort out how to change the color of the search Icon in light mode */}
            </div>
            <section className="w-full px-[28px] flex flex-row justify-between mt-[14px] contentButtonContainer">
                <ContentButton selected={selectedContentButton == "All notes" ? true : false} title="All notes" onClick={() => setSelectedContentButton("All notes")}/>
                <ContentButton selected={selectedContentButton == "Folders" ? true : false} title="Folders" onClick={() => setSelectedContentButton("Folders")}/>
            </section>
        </div>
    );
}
// Assign the values of 1 and 2 for selected and 
export default Dashboard;