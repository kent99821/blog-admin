import React, { useEffect, useState } from "react";
import { List, Row, Col, Button, message, Divider, Modal, Input } from 'antd';
import servicePath from "../config/apiUrl";
import axios from "axios";
import '../assets/css/ArticleList.css';
import InputColor from 'react-input-color';
const { confirm } = Modal;
function TypeManager() {
    const [typeInfo, setTypeInfo] = useState([]); //类别信息列表
    const [color, setColor] = useState({}); //类别颜色选择
    const [typeName, setTypeName] = useState(''); //类别名称
    const [typeId, setTypeId] = useState(0);
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
// 删除文章
const delTypeInfo = (id)=>{
    confirm({
        title:'确定删除这个分类吗？',
        content:'点击确认按钮后分类将会永远删除',
        okText:'确定',
        cancelText:'取消',
        onOk(){
            axios({
                method:'post',
                url:servicePath.delTypeInfo,
                data:{'id':id},
                headers: { 'Access-Control-Allow-Origin': '*', 'token': window.sessionStorage.getItem('token')},
                withCredentials:true
            }).then(
                res=>{
                    message.success('类别删除成功');
                    getTypeInfo();
                    setTypeId(0);
                   
                }
            )
        },
        onCancel(){
            message.success('已取消操作');
            setTypeId(0);
        }
    })
}
    const handleCancel = () => {
        setTypeName('');
        setTypeId(0);
        setColor({});
        message.info('已取消操作')
        setIsModalVisible(false);
    };
    //添加类别
    const addTypeInfo = () => {
        if(!typeName){
            message.info('请输入类别名称');
            return false;
        }else if(!color){
            message.info('请选择类别颜色');
            return false;
        }
        let dataProps = {};
        dataProps.typeName = typeName;
        dataProps.color = color.hex;
        if(typeId === 0){
            axios({
                method: 'post',
                url: servicePath.addTypeInfo,
                data:dataProps,
                headers: { 'Access-Control-Allow-Origin': '*', 'token': sessionStorage.getItem('token') },
                withCredentials: true,
    
            }).then(
                res => {
                    if (res.data.code === 200) {
                        message.success('操作成功');
                        setTypeName('');
                        setTypeId(0);
                        setColor({});
                        setIsModalVisible(false);
                        getTypeInfo();
                       
                    } else {
                        message.error('操作失败');
                        setTypeName('');
                        setTypeId(0);
                        setColor({});
                        setIsModalVisible(false);
                    }
                }
            )

        }
    }
    // 页面打开获取文章分类
    useEffect(() => {
        getTypeInfo();
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
                                <Button className="act" type="primary" onClick={()=>{delTypeInfo(item.id)}} danger>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Modal title="文章类别" okText="确认" cancelText="取消" visible={isModalVisible} onOk={addTypeInfo} onCancel={handleCancel}>
                <div className="inputSpan">
                    <span>类别名称</span>
                </div>
                <Input 
                placeholder="请输入类别名称" 
                onChange={e=>{
                    setTypeName(e.target.value)
                }}
                value={typeName}
                />
                <div className="inputSpan">
                    <span>类别颜色</span>
                </div>
                <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="right"
                    className="add"
                    value={color}

                />

            </Modal>
        </div>
    )
}
export default TypeManager;