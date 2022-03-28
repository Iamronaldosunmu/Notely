import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';

interface DesktopDashboardProps {
    setNumberOfRenders: Dispatch<SetStateAction<number>>;
    isFirstTime: boolean;
}

const DesktopDashboard : React.FC<DesktopDashboardProps> = ({setNumberOfRenders, isFirstTime}) => {
    const [a, setIsFirstTime] = useState<boolean>(true)
    useEffect(()=> {
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