import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions.ts';
import { Link, useNavigate } from 'react-router-dom';
import KaizntreeLogo from "../assets/Kaizntreelogo.png"

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
        dispatch(loginSuccess(email, password));
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    return (
        <>
            <div className='flex flex-col items-center my-10'>
                <img src={KaizntreeLogo} className='w-96'/>
                <form onSubmit={handleLogin}>
                    <div className='flex'>
                        {/* <label>Username:</label> */}
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            className='w-full h-10 border-2 rounded-lg m-2 p-2'
                            required/>
                    </div>
                    <div className='flex'>
                        {/* <label>Password:</label> */}
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='w-full h-10 border-2 rounded-lg m-2 p-2'
                            required />
                    </div>
                    <div>
                        <Link to="/forgot-password" className='mx-2 text-blue-500'>Forgot your password?</Link>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-1'>
                            <button type='button' className='border-2 rounded-lg m-2 w-32' onClick={handleSignup}>Create Account</button>
                        </div>
                        <div className='flex flex-1'>
                            <button type='submit' className='border-2 rounded-lg m-2 w-32' onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </>
    )

}

export default Login;