import React, { useState, useEffect, useContext, useRef } from 'react'
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Switch, Button, Modal, Row, Col, Input } from 'antd';
import { Context } from '../ContextAPI/store'
const TodoListComponent = () => {
    const [state, dispatch] = useContext(Context);
    const arrTemp = useRef([])
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            let arr;
            arr = arrTemp.current.map((todo) => {
                if (todo.id === dataUpdate.idTodo) {
                    return { ...todo, name: dataUpdate.name, des : dataUpdate.des };
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
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
            align: 'center',
            width: '10%',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'description',
            ellipsis: true,
            width: '70%',
        },
        {
            title: 'Checked',
            key: 'checked',
            render: (dataIndex) => (
                <Space size="middle">
                    <Switch checked={dataIndex.checked} onChange={() => {
                        let arr;
                        arr = arrTemp.current.map((todo) => {
                            if (todo.id === dataIndex.idTodo) {
                                return { ...todo, checked: !todo.checked };
                            } else {
                                return todo;
                            }
                        });
                        localStorage.setItem('todoList', JSON.stringify(arr)) //update local storage
                        dispatch({ type: "COMPLETE", payload: dataIndex.idTodo });
                    }} />
                </Space>
            ),
            align: 'center',
            width: 100
        },
        {
            title: 'Action',
            key: 'action',
            render: (dataIndex) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            setDataUpdate({ ...dataIndex })
                            showModal()
                        }} />
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger onClick={() => { console.log(dataIndex.idTodo) }} />
                </Space>
            ),
            align: 'center',
            width: 200,
        }

    ];
    const [data, setData] = useState([])
    useEffect(() => {
        if (state.todos) {
            let data = state.todos.filter(el => el.checked === false)
            data = data.map((el, index) => {
                return {
                    key: index + 1,
                    name: el.name,
                    id: index + 1,
                    idTodo: el.id,
                    des: el.des,
                    checked: el.checked,
                }
            })
            let todoList = localStorage.getItem('todoList');
            let arr = JSON.parse(todoList);
            arrTemp.current = arr
            setData(data)
        }
    }, [state.todos])
    return (
        <div>
            <Table
                columns={columns}
                pagination={{
                    position: ['none'],
                }}
                dataSource={data}
            />
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
        </div>
    )
}

export default TodoListComponent;