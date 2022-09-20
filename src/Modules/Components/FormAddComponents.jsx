import React, { useState, useContext, useMemo } from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string("Enter name")
        .required("Name is required"),
    des: yup
        .string("Enter description")
        .required("Description is required")
});

const FormAddComponent = () => {
    const key = 'updatable';
    const { Text } = Typography;
    const [loading, setLoading] = useState(false)
    // const [state, dispatch] = useContext(Context);
    const todoList = useSelector(state => state.todoList.todoList)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: "",
            des: "",
            checked : false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddItem(values)
        }
    })
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleAddItem = (values) => {
        // Add to globalstate, add localstorerage
        message.loading({
            content: 'Adding...',
            key,
        }, 100);
        setLoading(true)
        setTimeout(() => {
            const arr = [...todoList]
            arr.push({ ...values, id: uuidv4() })
            localStorage.setItem('todoList', JSON.stringify(arr)) //add localstorage
            dispatch(addTodo({ ...values, id: uuidv4() })) //add to global state
            message.success({
                content: 'Adding success',
                key,
            });
            setLoading(false)        
            formik.handleReset()
        }, 1000)
    }
    return (
        <div className='form-add-container'>
            <form>
                <Row>
                    <Col span={10} offset={6}>
                        <div className='form-container'>
                            <div className='input-wrapper'>
                                <Input placeholder='Name' size='large' name='name' value={formik.values.name} onChange={myHandleChange} />
                                {formik.touched.name && <Text type="danger">{formik.errors.name}</Text>}
                            </div>
                            <div className='input-wrapper'>
                                <Input placeholder='Description' size='large' name='des' value={formik.values.des} onChange={myHandleChange} />
                                {formik.touched.des && <Text type="danger">{formik.errors.des}</Text>}
                            </div>
                        </div>
                    </Col>
                    <Col span={2}>
                        <div className='btn-submit-form'>
                            <Button onClick={formik.handleSubmit} icon={<PlusOutlined />} loading={loading} type='danger'>Add new item</Button>
                        </div>
                    </Col>
                </Row>
            </form>
        </div >
    )
}

export default FormAddComponent;