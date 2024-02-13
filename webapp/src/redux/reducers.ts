import { User } from "../utilities/types.ts"

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
