import React, {useState} from 'react';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';
import Book from '../images/notebook-iso-color.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

const SignIn : React.FC = () => {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().min(3).label('Email'), 
        password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password')
    });
    const handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        const {error} = schema.validate({email, password});
        if (error) setErrors(error.details[0].message);
        else setErrors('');

        if (!errors) {
            console.log({email, password});
            // If no error, make async post request
            // While the request is being made, display a loader in the submit button
        }
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
                    {errors && <p className="text-center py-[10px] font-bold rounded-[10px] text-[#ff0033]">{errors}</p>}
                    <SubmitButton text="Sign In"/>
                    <p className="text-center text-[23px] mt-[25px]">Don't have an account? <span className="font-bold"><Link to="/signUp">Sign In</Link></span></p>
                </form>
            </main>
        </div>
    );
}

export default SignIn;