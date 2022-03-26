import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';

interface DesktopDashboardProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    match: {params: {noteId: string, userId: string}, url: string};

}

const DesktopDashboard : React.FC<DesktopDashboardProps> = ({history, match}) => {
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true)
    
    return (
        <div className="h-screen w-screen grid grid-cols-[195px_auto]">
            <DesktopNav history={history} isFirstTime={isFirstTime} setIsFirstTime={setIsFirstTime}/>
            <DesktopDashboardContent history={history} match={match} isFirstTime={isFirstTime} setIsFirstTime={setIsFirstTime}/>
        </div>
    );
};

export default DesktopDashboard;