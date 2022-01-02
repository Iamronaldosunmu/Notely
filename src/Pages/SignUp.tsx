import React from 'react';
import Pencil from '../images/pencil-iso-color.png';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';

const SignUp : React.FC = () => {
    return (
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[40vw_60vw]">
            <aside className="hidden items-center justify-center bg-[#FF9900] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <img className="max-w-[580px]" src={Pencil} alt="purple book"/>
            </aside>
            <main className="h-screen overflow-y-auto">
                <form className="mx-auto max-w-[800px] flex flex-col w-full px-[30px]">
                    <h1 className="font-black text-[72px] font-['Lato'] mb-[25px]">Sign Up</h1>
                    <InputGroup id="firstName" placeholder="Enter your first name" label="First Name"/>
                    <InputGroup id="email" placeholder="Enter your email address" label="Email address"/>
                    <InputGroup id="password" placeholder="Enter your password" label="Password" type="password"/>
                    <InputGroup id="ConfirmPassword" placeholder="Enter your password again" label="Confirm Password" type="password"/>
                    <SubmitButton text="Sign In"/>
                </form>
            </main>
        </div>
        );
}

export default SignUp;