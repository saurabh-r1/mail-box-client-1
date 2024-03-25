import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Authentication/authSlice";
import inboxSlice from "../components/mail/inboxSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        inbox: inboxSlice,
    } 
})

export default store;