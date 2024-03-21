import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Authentication/Login/SignUp/authSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
    } 
})

export default store;