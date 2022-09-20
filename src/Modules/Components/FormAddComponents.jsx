import React, { useState, useContext, useMemo } from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4} from 'uuid'
import { validateForm, validForm } from '../ultils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';

const FormAddComponent = () => {
    const key = 'updatable';
    const { Text } = Typography;
    const [formValue, setFormValue] = useState({ name: '', des: '', checked: false })
    const [validateValues, setValidateValues] = useState({});
    const [loading, setLoading] = useState(false)
    // const [state, dispatch] = useContext(Context);
    const todoList = useSelector(state => state.todoList.todoList)
    const dispatch = useDispatch()
    const handleAddItem = () => {
        const validateValues = validateForm(formValue)
        setValidateValues(validateValues)
        if (!validForm(validateValues)) {
            return;
        }
        // Add to globalstate, add localstorerage
        message.loading({
            content: 'Adding...',
            key,
          },100);
        setLoading(true)
        setTimeout(() => {
            const arr = [...todoList]
            arr.push({...formValue, id : uuidv4()})
            localStorage.setItem('todoList', JSON.stringify(arr)) //add localstorage
            dispatch(addTodo({...formValue, id : uuidv4()})) //add to global state
            message.success({
                content : 'Adding success',
                key,
            });
            setLoading(false)
            setFormValue(prevForm => {
                return {
                    ...prevForm,
                    name: '',
                    des: '',
                }
            })
            setValidateValues({})
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
                            {validateValues && <Text type="danger">{validateValues.nameErr}</Text>}
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
                            {validateValues && <Text type="danger">{validateValues.desErr}</Text>}
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