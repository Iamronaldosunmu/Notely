import React from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';

interface DesktopDashboardProps {
    history: {push : (routeName: string) => void, goBack : () => {}, replace : (routeName: string) => void}
}
const DesktopDashboard : React.FC<DesktopDashboardProps> = ({history}) => {
    return (
        <div className="h-screen w-screen grid grid-cols-[195px_auto]">
            <DesktopNav history={history} />
            <DesktopDashboardContent history={history} />
        </div>
    );
};

export default DesktopDashboard;