

export const loginSuccess = (email: string, password: string) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        email: email,
        password: password
    },
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const signupSuccess = (username: string, email: string, password: string) => ({
    type: 'SIGNUP_SUCCESS',
    payload: {
        username: username,
        email: email,
        password: password
    },
});
