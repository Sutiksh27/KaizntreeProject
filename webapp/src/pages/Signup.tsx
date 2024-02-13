import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signupSuccess } from '../redux/actions';
import KaizntreeLogo from "../assets/Kaizntreelogo.png";
import { Link } from 'react-router-dom';

interface SignupProps {
    onSignup: (username: string, email: string, password: string) => void
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform validation if needed
        if (password === confirmPassword) {
            onSignup(username, email, password);
            dispatch(signupSuccess(username, email, password));
        }
    };
    
    return (
        <div className='flex flex-col items-center my-10'>
            <img src={KaizntreeLogo} className='w-96' />
            <h1 className='text-2xl'>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        className='w-full h-10 border-2 rounded-lg m-2 p-2'
                        required
                    />
                </div>
                <div className='flex'>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='w-full h-10 border-2 rounded-lg m-2 p-2'
                        required
                    />
                </div>
                <div className='flex'>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='w-full h-10 border-2 rounded-lg m-2 p-2'
                        required
                    />
                </div>
                <div className='flex'>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        className='w-full h-10 border-2 rounded-lg m-2 p-2'
                        required
                    />
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className='border-2 rounded-lg m-2 w-32'>Sign Up</button>
                </div>
            </form>
            <div>
                <Link to="/login" className='mx-2 text-blue-500'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Signup