import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';
import {useHistory} from 'react-router-dom';

interface DesktopDashboardProps {
    setNumberOfRenders: Dispatch<SetStateAction<number>>;
    isFirstTime: boolean;
}

const DesktopDashboard : React.FC<DesktopDashboardProps> = ({setNumberOfRenders, isFirstTime}) => {
    const [a, setIsFirstTime] = useState<boolean>(true);
    const history = useHistory();
    useEffect(()=> {
        function changeToMobileScreen() {
            if (window.innerWidth < 1024) {
                history.push('/dashboard');
            }
        }
        window.addEventListener('resize',changeToMobileScreen);
        setNumberOfRenders(2);
    }, [])
    return (
        <div className="h-screen w-screen grid grid-cols-[195px_auto]">
            <DesktopNav isFirstTime={isFirstTime}  />
            <DesktopDashboardContent isFirstTime={isFirstTime} setNumberOfRenders={setNumberOfRenders}/>
        </div>
    );
};

export default DesktopDashboard;