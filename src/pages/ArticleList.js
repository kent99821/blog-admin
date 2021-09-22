import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from 'antd';
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../assets/css/ArticleList.css'
const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([]);
    //获取文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            headers: { 'Access-Control-Allow-Origin': '*', 'token': window.sessionStorage.getItem('token')},
            withCredentials: true
        }).then(
        res => {
            setList(res.data.list);
        })
}
// 删除文章
const delArticle = (id)=>{
    confirm({
        title:'确定删除这篇文章吗？',
        content:'点击确认按钮后文章将会永远删除',
        okText:'确定',
        cancelText:'取消',
        onOk(){
            axios({
                method:'post',
                url:servicePath.delArticle,
                data:{'id':id},
                headers: { 'Access-Control-Allow-Origin': '*', 'token': window.sessionStorage.getItem('token')},
                withCredentials:true
            }).then(
                res=>{
                    message.success('文章删除成功');
                    getList();
                }
            )
        },
        onCancel(){
            message.success('已取消操作');
        }
    })
}
// 修改文章
const updateArticle = (id)=>{
    props.history.push({pathname:'/admin/add/',query:{'id':id}});
}
useEffect(() => {
    getList();
}, [])
return (
    <div>
        <List
            header={
                <Row className="list-div">
                    <Col span={8}>
                        <b>标题</b>
                    </Col>
                    <Col span={4}>
                        <b>类别</b>
                    </Col>
                    <Col span={4}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={4}>
                        <b>浏览量</b>
                    </Col>
                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
            }
            bordered
            dataSource={list}
            renderItem={item => (
                <List.Item>
                    <Row className="list-div">
                        <Col span={8}>
                            {item.title}
                        </Col>
                        <Col span={4}>
                            {item.typeName}
                        </Col>
                        <Col span={4}>
                            {item.addTime}
                        </Col>
                        <Col span={4}>
                            {item.view_count}
                        </Col>
                        <Col span={4}>
                            <Button className="act" type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>
                            <Button className="act" type="primary" onClick={()=>{delArticle(item.id)}} danger>删除</Button>
                        </Col>
                    </Row>
                </List.Item>
            )}


        />

    </div>
)
}

export default ArticleList;
