import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../assets/css/AdminIndex.css'
import React, { useState } from 'react';
import {  BrowserRouter as Router, Route, Link, Switch  } from "react-router-dom";
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const handleClickArticle = e =>{
        if(e.key === 'addArticle'){
            props.history.push('/admin/add');
        }else{
            props.history.push('/admin/list/');
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
               
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        工作台
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                      {/* <Link to="/admin/addarticle"> 添加文章</Link> */}
                      添加文章
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} onClick={handleClickArticle} title="文章管理">
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                </Menu>
               
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>    
                        <Route  path="/admin/index"  component={AddArticle} />
                        <Route   path="/admin/add"  component={AddArticle} />
                        <Route   path="/admin/list/"  component={ArticleList} />

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );


}
export default AdminIndex;