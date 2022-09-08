import React, { useState, useContext } from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Context } from '../ContextAPI/store';
import { addData } from '../ContextAPI/actions'
const FormAddComponent = () => {
    const [formValue, setFormValue] = useState({ name: '', des: '', checked: false })
    const [loading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Context);
    const handleAddItem = () => {
        // Add to globalstate, add localstorerage
        setLoading(true)
        setTimeout(() => {
            let todoList = localStorage.getItem('todoList');
            let arr = JSON.parse(todoList)
            let lastID = 0;
            if (arr.length > 0) {
                lastID = arr[arr.length - 1].id
            }
            arr.push({ ...formValue, id: lastID + 1 })
            localStorage.setItem('todoList', JSON.stringify(arr)) //add localstorage
            dispatch({ type: addData, payload: { ...formValue, id: lastID + 1 } }) //add to global state
            setLoading(false)
            setFormValue(prevForm => {
                return {
                    ...prevForm,
                    name: '',
                    des: '',
                }
            })
        }, 1000)
    }
    return (
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
                        <Button onClick={handleAddItem} type='danger' icon={<PlusOutlined />} loading={loading}>Add new item</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FormAddComponent;