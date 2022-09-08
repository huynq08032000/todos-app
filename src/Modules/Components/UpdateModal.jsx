import React, { useState, useContext } from 'react';
import 'antd/dist/antd.css';
import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Input } from 'antd';
import { Context } from '../ContextAPI/store';

const UpdateModal = ({ dataIndex }) => {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({...dataIndex})
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            const arrTemp = JSON.parse(localStorage.getItem('todoList'))
            let arr;
            arr = arrTemp.map((todo) => {
                if (todo.id === dataUpdate.idTodo) {
                    return { ...todo, name: dataUpdate.name, des: dataUpdate.des };
                } else {
                    return todo;
                }
            });
            localStorage.setItem('todoList', JSON.stringify(arr))
            dispatch({ type: 'UPDATE', payload: dataUpdate })
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }} onClick={showModal} />
            <Modal
                title="Edit"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <div className='form-container'>
                    <div className='input-wrapper'>
                        <Input placeholder='Name' size='large' value={dataUpdate.name}
                            onChange={(e) => {
                                setDataUpdate(prevData => {
                                    return {
                                        ...prevData,
                                        name: e.target.value
                                    }
                                })
                            }} />
                    </div>
                    <div className='input-wrapper'>
                        <Input placeholder='Description' size='large' value={dataUpdate.des}
                            onChange={(e) => {
                                setDataUpdate(prevData => {
                                    return {
                                        ...prevData,
                                        des: e.target.value
                                    }
                                })
                            }} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateModal;