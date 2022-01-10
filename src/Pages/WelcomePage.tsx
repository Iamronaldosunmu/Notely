import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import welcomeImage from '../images/welcomeImage.svg';

interface WelcomeProps {
    history: {push: (routeName: string) => void}
}
const Welcome  : React.FC<WelcomeProps> = ({history}) => {
    const [user, setUser] = useState<{_id?: string, firstName?: string}>({});
    useEffect(() =>{
        try {
            const token = localStorage.getItem('token');
            // If there is no token, redirect the user to the sign in page
            if (!token) {
                history.push('/signIn');
            } else{
                const user = jwtDecode(token) as {};
                setUser(user);
                setTimeout(() => {
                    history.push('/dashboard')
                }, 3500)
            }
        } catch (error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');
            }
        }
    }, []);
    return (

        <div className="container bg-[#0E121A] h-screen flex flex-col justify-between sm:hidden ">
            <h1 className="text-[35px] text-white pl-[38px] pt-[20px]"><span className="font-bold">Note</span>ly</h1>
            <div className="text-center">
                <p className="text-2xl text-white text-[30px]">Welcome, </p>
                <p className="text-2xl text-white text-[30px] font-bold">{user.firstName}</p>
            </div>
            <div className="flex justify-center pb-[40px]">
                <img className="max-w-[280px]"  src={welcomeImage}/>
            </div>
        </div>
        
        );
}

export default Welcome;