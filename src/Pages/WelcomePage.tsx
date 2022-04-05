import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import welcomeImage from '../images/welcomeImage.png';
import {motion} from 'framer-motion';

interface WelcomeProps {
    history: {push: (routeName: string) => void}
}
const Welcome  : React.FC<WelcomeProps> = ({history}) => {
    const getDeviceDashboardRoute = () => {
        return window.innerWidth >= 1024 ? '/desktopDashboard' : 'dashboard';
    }
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
                    history.push(getDeviceDashboardRoute())
                }, 5500)
            }
        } catch (error: any) {
            if (error.message) {
                console.log(error.message);
                history.push('/signIn');
            }
        }
    }, []);
    return (

        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.8}}} className="w-full bg-[#0E121A] h-screen flex flex-col justify-between  ">
            <motion.h1 initial={{y: -100}} animate={{y: 0, transition: {delay: 1, type: "Spring", stiffness: 100}}} exit={{opacity: 0, transition: {duration: 0.4}}} className="text-[35px] text-white pl-[38px] pt-[20px]"><span className="font-bold">Note</span>ly</motion.h1>
            <div className="text-center lg:flex justify-center">
                <motion.p initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0, transition: {delay: 1.9, stiffness: 60}}} exit={{opacity: 0, transition: {duration: 0.4}}} className="text-2xl text-white text-[30px] lg:text-[38px] ">Welcome </motion.p>
                <motion.p initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0, transition: {delay: 1.9, stiffness: 60}}} exit={{opacity: 0, transition: {duration: 0.4}}} className="text-2xl text-white text-[30px] lg:text-[38px] lg:ml-3 font-bold">{user.firstName}</motion.p>
            </div>
            <div className="flex justify-center pb-[40px]">
                <motion.img initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1, transition: {delay: 2.7}}} exit={{opacity: 0, transition: {duration: 0.4}}} className="max-w-[280px]"  src={welcomeImage}/>
            </div>
        </motion.div>
        
        );
}

export default Welcome;