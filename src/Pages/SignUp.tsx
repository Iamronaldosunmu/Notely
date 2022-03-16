import React, {useState} from 'react';
import Pencil from '../images/pencil-iso-color.png';
import InputGroup from '../Components/InputGroup';
import SubmitButton from '../Components/SubmitButton';
import { Link } from 'react-router-dom';
import axios, {Axios, AxiosError} from 'axios';
import Joi from 'joi';
import {motion} from 'framer-motion';

interface SignUpProps {
    history: {push : (routeName: string) => void};
}


const SignUp : React.FC <SignUpProps> = (props) => {

    const [errors, setErrors] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [prev, setPrev] = useState('');

    const schema = Joi.object({
        firstName: Joi.string().required().min(3).label("First name"),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().min(3).label('Email'), 
        password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password'), 
        confirmPassword: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Confirm Password')
    });

    const handleSubmit = async (e: React.FormEvent<any>) => {
        e.preventDefault();
        const {error} = schema.validate({firstName, email, password, confirmPassword});
        if (prev !== email && errors == "You already have an account, Login") setErrors('');
        if (error) setErrors(error.details[0].message);
        else if (password !== confirmPassword) setErrors("The two passwords do not match");
        else if (!errors && firstName && email && password && confirmPassword) {
            try{
                const { data: token } = await axios.post('http://localhost:4000/api/v1/users/', {firstName, email, password} );
                localStorage.setItem('token', token);
                if (props.history) {
                    props.history.push('/welcome');
                }

            } catch(error: any) {
                if (error.response) {
                    setErrors(error.response.data.msg);
                    setPrev(email);
                }
            }
        }
        else if(errors !== "You already have an account, Login") setErrors('');

    };

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[40vw_60vw]">
            <motion.aside initial={{x: '-100%'}} animate={{x: 0}} transition={{duration: 0.8}} exit={{x: '-100%', transition: {delay: 1.1, duration: 0.8}}} className="hidden items-center justify-center bg-[#FF9900] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <motion.img initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.8, duration: 0.4}} exit={{opacity: 0, transition: {delay: 0.7, duration: 0.4}}} className="max-w-[580px]" src={Pencil} alt="purple book"/>
            </motion.aside>
            <main className="h-screen overflow-y-auto lg:flex items-center justify-center">
                <motion.form animate={{
                    transition: {
                        staggerChildren: .1
                    }
                }} className="mx-auto max-w-[750px] flex flex-col w-full px-[30px] py-[40px] lg:py-[0px] lg:max-w-[750px]" onSubmit={handleSubmit}>
                    <motion.h1 initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className="font-black text-[48px] font-['Lato'] mb-[15px] lg:mb-[10px]">Sign Up</motion.h1>
                    <InputGroup id="firstName" placeholder="Enter your first name" label="First Name" small={true} value={firstName} onChange={onFirstNameChange}/>
                    <InputGroup id="email" placeholder="Enter your email address" label="Email address" small={true} value={email} onChange={onEmailChange}/>
                    <InputGroup id="password" placeholder="Enter your password" label="Password" type="password" small={true} value={password} onChange={onPasswordChange}/>
                    <InputGroup id="ConfirmPassword" placeholder="Enter your password again" label="Confirm Password" type="password" small={true} value={confirmPassword} onChange={onConfirmPasswordChange}/>
                    {errors && <p className="text-center font-bold py-[10px] rounded-[10px] text-[#ff0033]">{errors}</p>}
                    <SubmitButton text="Sign Up" bgColor="bg-[#FF9900]" small={true}/>
                    <motion.p initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.7, delay: 1.4, }} exit={{y: 80, opacity: 0, transition: {delay: 0, duration: 0.7}}} className="text-center text-[18px] mt-[15px]">Don't have an account? <span className="font-bold"><Link to="/signIn">Sign in</Link></span></motion.p>
                </motion.form>
            </main>
        </div>
        );
}

export default SignUp;