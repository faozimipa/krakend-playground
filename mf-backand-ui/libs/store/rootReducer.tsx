import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./../../apps/home/src/app/pages/login/UserSlice";

const rootReducer = combineReducers({ 
    authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;