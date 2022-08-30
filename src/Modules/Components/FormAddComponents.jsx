import React, { useState } from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormAddComponent = () => {
    const [formValue, setFormValue] = useState({ name: '', des: '' })
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
                        <Button type='danger' icon={<PlusOutlined />}>Add new item</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FormAddComponent;