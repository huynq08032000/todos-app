import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../Modules/redux/todoSlice";

const store = configureStore({
    reducer : {
        todoList : todoSlice
    }
})

export default store