import React, { useContext, useEffect } from 'react'
import TabsComponent from './TabsComponent';
import '../Css/Component.css'
import FormAddComponent from './FormAddComponents';
import { useDispatch } from 'react-redux';
import { setTodo } from '../redux/todoSlice';
const TodoComponent = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        let todoList = localStorage.getItem('todoList');
        if (todoList){ 
            let arr = JSON.parse(todoList)
            dispatch(setTodo(arr))
        } else {
            localStorage.setItem('todoList', JSON.stringify([]))
        }
    }, [])
    
    return (
        <div>
            <div className='header-title'>
                Todo App
            </div>
            <FormAddComponent />
            <TabsComponent />
        </div>
    )
}
export default TodoComponent;