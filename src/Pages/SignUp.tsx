import React from 'react';
import Pencil from '../images/pencil-iso-color.png';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';

const SignUp : React.FC = () => {
    const handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
    };
    return (
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[40vw_60vw]">
            <aside className="hidden items-center justify-center bg-[#FF9900] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <img className="max-w-[580px]" src={Pencil} alt="purple book"/>
            </aside>
            <main className="h-screen overflow-y-auto">
                <form className="mx-auto max-w-[800px] flex flex-col w-full px-[30px] py-[40px] lg:py-[0px] lg:max-w-[750px]" onSubmit={handleSubmit}>
                    <h1 className="font-black text-[72px] font-['Lato'] mb-[15px] lg:mb-[10px]">Sign Up</h1>
                    <InputGroup id="firstName" placeholder="Enter your first name" label="First Name" small={true}/>
                    <InputGroup id="email" placeholder="Enter your email address" label="Email address" small={true}/>
                    <InputGroup id="password" placeholder="Enter your password" label="Password" type="password" small={true}/>
                    <InputGroup id="ConfirmPassword" placeholder="Enter your password again" label="Confirm Password" type="password" small={true}/>
                    <SubmitButton text="Sign In" bgColor="bg-[#FF9900]" small={true}/>
                    <p className="text-center text-[18px] mt-[15px]">Don't have an account? <span className="font-bold">Sign Up</span></p>
                </form>
            </main>
        </div>
        );
}

export default SignUp;