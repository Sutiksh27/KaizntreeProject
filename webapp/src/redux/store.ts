// store.ts
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer);

export default store;

// Define RootState type to use in useSelector
export type RootState = ReturnType<typeof rootReducer>;
