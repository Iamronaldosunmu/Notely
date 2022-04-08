import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DesktopDashboardContent from '../Components/DesktopDashboardContent';
import DesktopNav from '../Components/DesktopNav';
import {useHistory} from 'react-router-dom';

interface DesktopDashboardProps {
    setNumberOfRenders: Dispatch<SetStateAction<number>>;
    isFirstTime: boolean;

}

const DesktopDashboard : React.FC<DesktopDashboardProps> = ({setNumberOfRenders, isFirstTime}) => {
    const [uploadImageIsShowing, setUploadImageIsShowing] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<string>("All Notes");

    const history = useHistory();
    useEffect(()=> {
        function changeToMobileScreen() {
            if (window.innerWidth < 1024) {
                history.push('/dashboard');
            }
        }
        window.addEventListener('resize', changeToMobileScreen);
        setNumberOfRenders(2);
    }, [])
    return (
        <div className="h-screen w-screen grid lg:grid-cols-[150px_auto] xl:grid-cols-[195px_auto]">
            <DesktopNav selectedButton={selectedButton} setSelectedButton={setSelectedButton} isFirstTime={isFirstTime} setUploadImageIsShowing={setUploadImageIsShowing}/>
            <DesktopDashboardContent selectedButton={selectedButton} setSelectedButton={setSelectedButton} isFirstTime={isFirstTime} setNumberOfRenders={setNumberOfRenders} uploadImageIsShowing={uploadImageIsShowing} setUploadImageIsShowing={setUploadImageIsShowing}/>
        </div>
    );
};

export default DesktopDashboard;