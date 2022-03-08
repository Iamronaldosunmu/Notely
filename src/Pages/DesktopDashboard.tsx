import React, { useEffect } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';

interface DesktopDashboardProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void};
    match: {params: {noteId: string, userId: string}, url: string};
}
const DesktopDashboard : React.FC<DesktopDashboardProps> = ({history, match}) => {
    return (
        <div className="h-screen w-screen grid grid-cols-[195px_auto]">
            <DesktopNav history={history} />
            <DesktopDashboardContent history={history} match={match}/>
        </div>
    );
};

export default DesktopDashboard;