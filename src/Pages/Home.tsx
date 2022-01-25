import React, {useState} from 'react';
import MobileNavItem from '../Components/MobileNavItem';
import sally from '../images/sally.png';

interface HomeProps {
    history: {push : (routeName: string) => void,  replace : (routeName: string) => void}
}

const Home : React.FC<HomeProps> = ({history}) => {
    const [mobileNavIsShowing, setMobileNavIsShowing] = useState<boolean>(false);
    const [selectedMobileNavItem, setSelectedMobileNavItem] = useState<string>('Home');
    return (
        <div className="bg-[#5352ED] min-h-[100vh]">
            <div className="bg-[#5352ED] min-h-[100vh] container mx-auto">
                <nav className="px-[25px] lg:px-[50px] pt-[15px] flex justify-between items-center">
                    <p className="text-[32px] lg:text-[48px] text-white font-['Lato']"><span className="font-extrabold">Note</span><span className="">ly</span></p>
                    <button className="flex lg:hidden z-10" onClick={() => setMobileNavIsShowing(true)}>
                        <div className="w-[16px] h-[16px] rounded-full bg-white mr-[6px]"></div>
                        <div className="w-[16px] h-[16px] rounded-full bg-white mr-[6px]"></div>
                        <div className="w-[16px] h-[16px] rounded-full bg-white"></div>
                    </button>
                    <div className="hidden lg:flex justify-between items-center w-full max-w-[525px]">
                        <button className="text-[30px] text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem">Contact Us</button>
                        <button className="text-[30px] text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem" onClick={() => history.push('/signIn')}>Sign In</button>
                        <button className="text-[30px] text-[rgba(255,255,255,0.65)] hover:text-[rgba(255,255,255,1)] navItem" onClick={() => history.push('/signUp')}>Sign Up</button>
                    </div>
                </nav>
                <section className="px-[25px] lg:px-[50px] mt-[50px] text-center lg:text-left pb-[40px] flex flex-col lg:flex-row lg:justify-between ">
                    <div>
                        <p className="text-center lg:text-left text-[55px] lg:text-[75px] xl:text-[90px] font-black text-white font-['Lato'] max-w-[345px] lg:max-w-[470px] xl:max-w-[560px] mx-auto lg:mx-[0]">All your notes - in one place</p>
                        <p className="text-center lg:text-left text-white text-[18px] lg:text-[22px]  mt-[20px] max-w-[585px] lg:max-w-[470px] xl:max-w-[560px] mx-auto lg:mx-[0]">You don’t need a different notepad app for your phone, tablet, and laptop, just use Notely!</p>
                        <button className="text-[22px] text-[#474956] bg-white py-[14px] px-[67px] lg:px-[100px] rounded-[18px] mt-[35px] z-30" onClick={() => history.push('/signUp')}>Get started</button>
                    </div>
                    <img src={sally} className="relative w-full max-w-[450px] lg:max-w-[540px] lg:bottom-[10px] xl:max-w-[690px] xl:bottom-[100px] mx-auto lg:mx-[0]" />
                </section>
            </div>
            <div className={mobileNavIsShowing ? "fixed lg:hidden top-0 bottom-0 right-0 left-0 closeMobileNav showing" : "fixed lg:hidden top-0 bottom-0 right-0 left-0" } onClick={() => setMobileNavIsShowing(false)}></div>
            <div className={mobileNavIsShowing ?"fixed lg:hidden w-[300px] mx-auto h-[400px] top-0 right-0 left-0 bottom-0 my-auto rounded-[55px] shadow-[0_4px_64px_20px_rgba(0,0,0,0.16)] py-[70px] pl-[80px] bg-[#5352ED] flex flex-col justify-between mobileNavPopUp visible" : "fixed lg:hidden w-[300px] mx-auto h-[400px] top-0 right-0 left-0 bottom-0 my-auto rounded-[55px] shadow-[0_4px_64px_20px_rgba(0,0,0,0.16)] py-[70px] pl-[80px] bg-[#5352ED] flex flex-col justify-between mobileNavPopUp"}>
                <MobileNavItem selected={selectedMobileNavItem == "Home"} name="Home" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => setMobileNavIsShowing(false)}/>
                <MobileNavItem selected={selectedMobileNavItem == "Sign In"} name="Sign In" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => history.push('/signIn')}/>
                <MobileNavItem selected={selectedMobileNavItem == "Sign Up"} name="Sign Up" setSelectedMobileNavItem={setSelectedMobileNavItem} onClick={() => history.push('/signUp')}/>
            </div>
        </div>
    );
}

export default Home;