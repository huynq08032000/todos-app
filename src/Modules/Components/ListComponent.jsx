import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Switch, Button, Modal, Input, Typography } from 'antd';
import { validateForm, validForm } from '../ultils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, setComplete, updateTodo } from '../redux/todoSlice';
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

const ListComponent = ({ typeChecked }) => {
    const { Text } = Typography;
    const arrTemp = useRef([])
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [switchLoading, setSwitchLoading] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: dataUpdate,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleOk(values)
        }
    })
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const todoList = useSelector(state => state.todoList.todoList)
    const showModal = () => {
        setOpen(true);
    };
    const showModalDel = () => {
        setOpenDel(true);
    }
    const handleOk = (values) => {
        setConfirmLoading(true);
        setTimeout(() => {
            arrTemp.current = arrTemp.current.map((todo) => {
                if (todo.id === values.idTodo) {
                    return { ...todo, name: values.name, des: values.des };
                } else {
                    return todo;
                }
            });
            localStorage.setItem('todoList', JSON.stringify(arrTemp.current))
            // dispatch({ type: 'UPDATE', payload: dataUpdate })
            dispatch(updateTodo(values))
            setOpen(false);
            setConfirmLoading(false);
            formik.handleReset()
        }, 2000);
    };
    const handleOkDel = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            arrTemp.current = arrTemp.current.filter((todo) => todo.id != dataUpdate.idTodo);
            localStorage.setItem('todoList', JSON.stringify(arrTemp.current))
            // dispatch({ type: 'DELETE', payload: dataUpdate })
            dispatch(deleteTodo(dataUpdate))
            setOpenDel(false);
            setConfirmLoading(false);
        }, 2000);
    }
    const handleCancel = () => {
        formik.handleReset()
        setOpen(false);
    };
    const handleCancelDel = () => {
        setOpenDel(false);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'idTodo',
            width: '5%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text>{text}</Text>,
            align: 'center',
            width: '10%',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'description',
            // ellipsis: true,
            width: '60%',
        },
        {
            title: 'Checked',
            key: 'checked',
            render: (dataIndex) => (
                <Space size="middle">
                    <Switch loading={switchLoading} checkedChildren="Done" unCheckedChildren="Todo" checked={dataIndex.checked}
                        onChange={() => {
                            setSwitchLoading(true)
                            arrTemp.current = arrTemp.current.map((todo) => {
                                if (todo.id === dataIndex.idTodo) {
                                    return { ...todo, checked: !todo.checked };
                                } else {
                                    return todo;
                                }
                            });
                            let arr = [...data]
                            arr = arr.map((todo) => {
                                if (todo.idTodo === dataIndex.idTodo) {
                                    return { ...todo, checked: !todo.checked };
                                } else {
                                    return todo;
                                }
                            });
                            setData([...arr])
                            setTimeout(() => {
                                localStorage.setItem('todoList', JSON.stringify(arrTemp.current)) //update local storage
                                //dispatch
                                dispatch(setComplete(dataIndex.idTodo))
                                setSwitchLoading(false)
                            }, 500)

                        }} />
                </Space>
            ),
            align: 'center',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (dataIndex) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            formik.setValues({...dataIndex})
                            showModal()
                        }} />
                    {/* <UpdateModal dataIndex={dataIndex}/> */}
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger
                        onClick={() => {
                            setDataUpdate({ ...dataIndex })
                            showModalDel();
                        }}
                    />
                </Space>
            ),
            align: 'center',
            width: '10%',
        }

    ];

    useEffect(() => {
        if (todoList) {
            let data = todoList.filter(el => el.checked === typeChecked)
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
            arrTemp.current = [...todoList]
            setData(data)
        }
    }, [todoList])

    return (
        <div>
            <Table
                columns={columns}
                pagination={{
                    pageSize: 10,
                }}
                dataSource={data}
                scroll={{
                    y: 500,
                }}
            />
            <Modal
                title="Edit"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={formik.handleSubmit} style={{ backgroundColor: 'green' }}>
                        Save
                    </Button>,
                ]}
            >
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
            </Modal>
            <Modal
                title="Delete"
                open={openDel}
                onOk={handleOkDel}
                onCancel={handleCancelDel}
                footer={[
                    <Button key="back" onClick={handleCancelDel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOkDel} danger>
                        Save
                    </Button>,
                ]}
            >
                <Space direction="vertical">
                    <Text type='danger'>Bạn muốn xóa công việc </Text>
                    <Text>{dataUpdate.name}</Text>
                    <Text>{dataUpdate.des}</Text>
                </Space>
            </Modal>
        </div>
    )
}

export default ListComponent;