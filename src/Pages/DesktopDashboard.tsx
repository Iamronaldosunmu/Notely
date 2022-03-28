import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';

interface DesktopDashboardProps {
    match: {params: {noteId: string, userId: string}, url: string};

}

const DesktopDashboard : React.FC<DesktopDashboardProps> = ({match}) => {
    const [a, setIsFirstTime] = useState<boolean>(true)
    const [numberOfRenders, setNumberOfRenders] = useState<number>(1);
    const isFirstTime = numberOfRenders === 1;

    return (
        <div className="h-screen w-screen grid grid-cols-[195px_auto]">
            <DesktopNav isFirstTime={isFirstTime} setNumberOfRenders={setNumberOfRenders} setIsFirstTime={setIsFirstTime}/>
            <DesktopDashboardContent match={match} isFirstTime={isFirstTime} setIsFirstTime={setIsFirstTime}/>
        </div>
    );
};

export default DesktopDashboard;