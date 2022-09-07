import React, { useState, useCallback} from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TabsComponent from './TabsComponent';
import '../Css/Component.css'
const TodoComponent = () => {
    const [count, setCount] = useState(0)
    const [formValue, setFormValue] = useState({ name: '', des: '', checked: false })
    const handleAddItem = useCallback((formValue) => {
        console.log('Add item')
        console.log(formValue)
        // Add to local storerage, and check localstorerage is context api ? 
        let todoList = localStorage.getItem('todoList');
        if (todoList) {
            let arr = JSON.parse(todoList)
            arr.push(formValue)
            localStorage.setItem('todoList', JSON.stringify(arr));
            setCount(count+1)
        } else {
            localStorage.setItem('todoList', JSON.stringify([formValue]))
            setCount(1)
        }
        setFormValue(prevForm => {
            return {
                ...prevForm,
                name: '',
                des: '',
            }
        })
    },[count])
    return (
        <div>
            <div className='header-title'>
                Todo App
            </div>
            <div className='form-add-container'>
                <Row>
                    <Col span={10} offset={6}>
                        <div className='form-container'>
                            <div className='input-wrapper'>
                                <Input placeholder='Name' size='large' value={formValue.name}
                                    onChange={(e) => {
                                        setFormValue((prevForm) => {
                                            return {
                                                ...prevForm,
                                                name: e.target.value
                                            }
                                        })
                                    }} />
                            </div>
                            <div className='input-wrapper'>
                                <Input placeholder='Description' size='large' value={formValue.des}
                                    onChange={(e) => {
                                        setFormValue((prevForm) => {
                                            return {
                                                ...prevForm,
                                                des: e.target.value
                                            }
                                        })
                                    }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={2}>
                        <div className='btn-submit-form'>
                            <Button onClick={()=>handleAddItem(formValue)} type='danger' icon={<PlusOutlined />}>Add new item</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <TabsComponent handleAddItem = {handleAddItem}/>
        </div>
    )
}
export default TodoComponent;