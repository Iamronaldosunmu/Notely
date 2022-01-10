import React, {useEffect, useState} from 'react';
import profilePic from '../images/ronaldprofilepic1.png';
import darkIcon from '../images/DarkModeSvg.svg';
import lightIcon from '../images/SunSvg.svg';
import jwtDecode from 'jwt-decode'
interface DashboardProps {
    history: {push : (routeName: string) => void}
}

const Dashboard : React.FC<DashboardProps> = ({history}) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    const darkModeButtonClasses = "w-[93px] h-[45px] rounded-[22.5px] bg-[#000000] mr-[15px] darkModeButton ";
    const onDarkModeButtonClick = () => {
        setIsDarkTheme(!isDarkTheme);
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
        <div className="dark:bg-[#0E121A] h-screen w-screen">
            <section className="flex justify-between pt-[15px]">
                <p className="text-[32px] dark:text-white pl-[25px]"><span className="font-bold">Note</span>ly</p>
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
            <p className="text-[32px] pl-[25px] dark:text-white">Hi {user.firstName} <span className="text-[45px]">👋</span></p>
            <div className="mx-[28px] w-[100%]"></div>
        </div>
    );
}

export default Dashboard;