import React, { useState, useEffect, useContext, useRef } from 'react'
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Space, Switch, Button, Modal, Row, Col, Input } from 'antd';
import { Context } from '../ContextAPI/store';
import UpdateModal from './UpdateModal';

const confirm = (data) => {
    Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Bla bla ...',
        okText: 'Delete',
        cancelText: 'Cancel',
    });
    console.log(data)
};
const TodoListComponent = () => {
    const [state, dispatch] = useContext(Context);
    const arrTemp = useRef([])
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
                    {/* <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            setDataUpdate({ ...dataIndex })
                            showModal()
                        }} /> */}
                    <UpdateModal dataIndex={dataIndex}/>
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger
                        onClick={() => {
                            console.log(dataIndex.idTodo)
                            confirm({dataIndex})
                        }}
                    />
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
        </div>
    )
}

export default TodoListComponent;