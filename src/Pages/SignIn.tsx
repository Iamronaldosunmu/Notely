import React from 'react';
import InputGroup from '../Components/InputGroup';
import Book from '../images/notebook-iso-color.png';

const SignIn : React.FC = () => {
    return (
        // When creating animations with framer motion, let the purple and the yellow asides slide in from left to right then the image fill fade in up and so will the form
        // Make the position of the aside to be fixed to the left so that even if the form is larger than the screenheight, it won't be affected by scrolling
        // Or set height of the grid to be 100vh and set the overflow of the grid to hidden, but enable vertical scrolling in the main container (container for the form)
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[60vw_40vw]">
            <aside className="hidden items-center justify-center bg-[#8329BE] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <img className="max-w-[607px]" src={Book} alt="purple book"/>
            </aside>
            <main className="h-screen">
                <form className="mx-auto max-w-[450px]">
                    <h1 className="font-black text-[72px] font-['Lato'] mb-[40px]">Sign In</h1>
                    <InputGroup id="email" placeholder="Enter your email address" label="Email address"/>
                </form>
            </main>
        </div>
    );
}

export default SignIn;