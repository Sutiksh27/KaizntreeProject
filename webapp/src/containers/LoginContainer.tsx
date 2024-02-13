import React from 'react';
import Login from "../pages/Login.tsx";
import apiHelper from '../utilities/ApiHelper.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import DashboardContainer from './DashboardContainer.tsx';

const LoginContainer: React.FC = () => {
    const handleLogin = async (email: string, password: string) => {
        console.log('Logging in with: ', email, password);
        const credentials = {
            email: email,
            password: password
        }
        let login = await apiHelper.loginUser(credentials);
        console.log('Login: ', login);
        
    };


    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    console.log(isLoggedIn);

    return (
        <>
            {
                !isLoggedIn ? <Login onLogin={handleLogin}/> : <DashboardContainer/>
            }
        </>
    );
};

export default LoginContainer