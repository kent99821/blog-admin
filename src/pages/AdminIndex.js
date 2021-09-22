import { Layout, Menu, Breadcrumb } from 'antd';
import {
    AppstoreAddOutlined,
    PieChartOutlined,
    FileOutlined,
    PoweroffOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../assets/css/AdminIndex.css'
import React, { useState } from 'react';
import { Link, Switch } from "react-router-dom";
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import MyRoute from '../myRouter';
import TypeManager from './TypeManager';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const logout = ()=> {
        sessionStorage.removeItem('token');
        props.history.push('/login')
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/admin">工作台</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        <Link to="/admin/type">类别管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
                        <Menu.Item key="addArticle">
                            <Link to="/admin/add"> 添加文章</Link>
                        </Menu.Item>
                        <Menu.Item key="articleList">
                            <Link to="/admin/list/"> 文章列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                    <Menu.Item key="10" icon={<PoweroffOutlined />} onClick={logout}>
                        退出系统
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
                        <Switch>
                            <MyRoute path="/admin/type" component={TypeManager}></MyRoute>
                            <MyRoute path="/admin/add" component={AddArticle} ></MyRoute>
                            <MyRoute path="/admin/list/" component={ArticleList} ></MyRoute>
                            <MyRoute path="/admin/add/:id" component={AddArticle} ></MyRoute>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );


}
export default AdminIndex;