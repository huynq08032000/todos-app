import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Switch, Button } from 'antd';

const DoneListComponent = ({handleAddItem}) => {
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
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: '70%',
        },
        {
            title: 'Checked',
            key: 'checked',
            render: (dataIndex) => (
                <Space size="middle">
                    <Switch checked={dataIndex.checked} onChange={(dataIndex) => {
                        console.log(dataIndex.id)
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
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }} onClick={() => { console.log(dataIndex.id) }} />
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger onClick={() => { console.log(dataIndex.id) }} />
                </Space>
            ),
            align: 'center',
            width: 200,
        }

    ];
    const [data, setData] = useState([])
    useEffect(() => {
        console.log('re-render')
        if (localStorage.getItem('todoList')) {
            let data = JSON.parse(localStorage.getItem('todoList')).filter(el => el.checked === true)
            data = data.map((el, index) => {
                return {
                    key: index + 1,
                    name: el.name,
                    id: index + 1,
                    description: el.des,
                    checked: el.checked,
                }
            })
            console.log(data)
            setData(data)
        }
    }, [handleAddItem])
    return (
        <div>
            <Table
                columns={columns}
                pagination={{
                    position:[`none`],
                }}
                dataSource={data}
            />
        </div>
    )
}

export default DoneListComponent;