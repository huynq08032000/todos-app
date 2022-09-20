import { createSlice } from "@reduxjs/toolkit";

const initState = {
    todoList : [],
}

const todoSlice = createSlice({
    name : 'todoList',
    initialState : initState,
    reducers: {
        setTodo : (state, action) => {
            state.todoList = [...action.payload]
        }, 
        addTodo : (state, action) => {
            state.todoList.push(action.payload)
        },
        setComplete : (state, action) => {
            state.todoList = state.todoList.map((todo)=>{
                if (todo.id === action.payload) {
                    return { ...todo, checked: !todo.checked };
                } else {
                    return todo;
                }
            })
        },
        updateTodo : (state, action) => {
            state.todoList = state.todoList.map((todo)=> {
                if (todo.id === action.payload.idTodo) {
                    return { ...todo, name: action.payload.name, des : action.payload.des };
                } else {
                    return todo;
                }
            })
        },
        deleteTodo : (state,action) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload.idTodo)
        }
    }
})
export const {setTodo , addTodo, setComplete, updateTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer;