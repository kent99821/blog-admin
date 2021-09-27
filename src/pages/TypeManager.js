import React, { useEffect, useState } from "react";
import { List, Row, Col, Button, message, Divider, Modal, Input } from 'antd';
import servicePath from "../config/apiUrl";
import axios from "axios";
import '../assets/css/ArticleList.css';
import InputColor from 'react-input-color';


function TypeManager() {
    const [typeInfo, setTypeInfo] = useState([]); //文章类别信息
    const [color, setColor] = useState({}); //类别颜色选择
    const [isModalVisible, setIsModalVisible] = useState(false);//模态框是否显示
    // 获取文章类别
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            headers: { 'Access-Control-Allow-Origin': '*', 'token': sessionStorage.getItem('token') },
            withCredentials: true,

        }).then(
            res => {
                //   console.log(res.data);
                if (res.data.code === 200) {
                    setTypeInfo(res.data.data);
                } else {
                    message.error('获取文章类别失败');
                }
            }
        )

    }
    //模态框
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // 页面打开获取文章分类
    useEffect(() => {
        getTypeInfo()
    }, []);
    return (
        <div>
            <Button className="add" type="primary" onClick={showModal}>添加</Button>
            <List
                header={
                    <Row className="list-div">
                        <Col span={4}>
                            <b>ID</b>
                        </Col>
                        <Col span={8}>
                            <b>类别名称</b>
                        </Col>
                        <Col span={4}>
                            <b>类别颜色</b>
                        </Col>
                        <Col span={8}>
                            <b>操作</b>
                        </Col>

                    </Row>
                }
                bordered
                dataSource={typeInfo}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={4}>
                                {item.id}
                            </Col>
                            <Col span={8}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.color}
                            </Col>
                            <Col span={8}>
                                <Button className="act" type="primary" >修改</Button>
                                <Button className="act" type="primary" danger>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Modal title="文章类别" okText="确认" cancelText="取消" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="inputSpan">
                    <span>类别名称</span>
                </div>
                <Input placeholder="请输入类别名称" />
                <div className="inputSpan">
                    <span>类别颜色</span>
                </div>
                <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="right"
                    className="add"

                />

            </Modal>
            <div className="colorSelect">
                <Divider orientation="left">颜色选择器</Divider>

                <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="right"
                    className="add"

                />
            </div>
        </div>
    )
}
export default TypeManager;