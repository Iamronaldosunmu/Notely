import React from 'react';
import Pencil from '../images/pencil-iso-color.png';

const SignUp : React.FC = () => {
    return (
        <div className="w-full max-h-screen lg:overflow-hidden lg:grid lg:grid-cols-[40vw_60vw]">
            <aside className="hidden items-center justify-center bg-[#FF9900] h-screen rounded-tr-[100px] rounded-br-[100px] lg:flex">
                <img className="max-w-[580px]" src={Pencil} alt="purple book"/>
            </aside>
            <main className="h-screen">
                <form className="">
                    <h1 className=""></h1>
                </form>
            </main>
        </div>
        );
}

export default SignUp;