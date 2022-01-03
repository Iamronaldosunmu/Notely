import React, {useState} from 'react';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';
import Book from '../images/notebook-iso-color.png';

const SignIn : React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        console.log({email, password})
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        // When creating animations with framer motion, let the purple and the yellow asides slide in from left to right then the image fill fade in up and so will the form
        // Make the position of the aside to be fixed to the left so that even if the form is larger than the screenheight, it won't be affected by scrolling
        // Or set height of the grid to be 100vh and set the overflow of the grid to hidden, but enable vertical scrolling in the main container (container for the form)
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[60vw_40vw]">
            <aside className="hidden items-center justify-center bg-[#8329BE] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <img className="max-w-[607px]" src={Book} alt="purple book"/>
            </aside>
            <main className="h-screen flex items-center justify-center">
                <form className="mx-auto max-w-[500px] flex flex-col w-full px-[30px]" onSubmit={handleSubmit}>
                    <h1 className="font-black text-[72px] font-['Lato'] mb-[25px]">Sign In</h1>
                    <InputGroup id="email" placeholder="Enter your email address" label="Email address" value={email} onChange={onEmailChange}/>
                    <InputGroup id="password" placeholder="Enter your password" label="Password" type="password" value={password} onChange={onPasswordChange}/>
                    <SubmitButton text="Sign In"/>
                    <p className="text-center text-[18px] mt-[25px]">Don't have an account? <span className="font-bold">Sign Up</span></p>
                </form>
            </main>
        </div>
    );
}

export default SignIn;