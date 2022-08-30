import React from 'react'
import FormAddComponent from './FormAddComponents';
import TabsComponent from './TabsComponent';
import '../Css/Component.css'
const TodoComponent = () => {

    return (
        <div>
            <div className='header-title'>
                Todo App
            </div>
            <FormAddComponent/>
            <TabsComponent/>
        </div>
    )
}

export default TodoComponent;