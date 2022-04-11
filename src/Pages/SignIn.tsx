import React, {useState} from 'react';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';
import Book from '../images/notebook-iso-color.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
import {motion} from 'framer-motion';

interface SignInProps {
    history: {push : (routeName: string) => void};
}


const SignIn : React.FC <SignInProps> = ({history}) => {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().min(3).label('Email'), 
        password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password')
    });
    const handleSubmit = async (e: React.FormEvent<any>) => {
        e.preventDefault();
        const {error} = schema.validate({email, password});
        if (error) setErrors(error.details[0].message);
        else setErrors('');

        if (!errors) {
            // If no error, make async post request
            // While the request is being made, display a loader in the submit button
            try {
                setIsLoading(true);
                const {data: token} = await axios.post('https://notelyapp1.herokuapp.com/api/v1/login', {email, password});
                localStorage.setItem('token', token);
                history.push('/welcome');
            }catch (error: any) {
                if (error.response.status === 400) {
                    setErrors(error.response.data.msg);
                } else {
                    alert('Check your internet connection');
                }
            } finally {
                setIsLoading(false);
            }
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
            <motion.aside initial={{x: '-100%'}} animate={{x: 0}} transition={{duration: 0.8}} exit={{x: '-100%', transition: {delay: 1.1, duration: 0.8}}} className="hidden items-center justify-center bg-[#8329BE] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <motion.img initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.8, duration: 0.4}} exit={{opacity: 0, transition: {delay: 0.7, duration: 0.4}}} className="max-w-[607px]" src={Book} alt="purple book"/>
            </motion.aside>
            <main className="h-screen flex items-center justify-center">
                <form className="mx-auto max-w-[500px] flex flex-col w-full px-[30px]" onSubmit={handleSubmit}>
                    <motion.h1 initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className="font-black text-[48px] font-['Lato'] mb-[15px]">Sign In</motion.h1>
                    <InputGroup small={true} id="email" placeholder="Enter your email address" label="Email address" value={email} onChange={onEmailChange}/>
                    <InputGroup small={true} id="password" placeholder="Enter your password" label="Password" type="password" value={password} onChange={onPasswordChange}/>
                    {errors && <motion.p exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className="text-center py-[10px] font-bold rounded-[10px] text-[#ff0033]">{errors}</motion.p>}
                    <SubmitButton isLoading={isLoading} small={true} text="Sign In"/>
                    <motion.p initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className="text-center text-[18px] sm:text-[23px] mt-[25px]">Don't have an account? <span className="font-bold"><Link to="/signUp">Sign Up</Link></span></motion.p>
                </form>
            </main>
        </div>
    );
}

export default SignIn;