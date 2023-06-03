import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/tasksSlice';

export const store = configureStore({
    reducer:{
        tasks:taskReducer,
    }
});