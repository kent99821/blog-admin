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
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function AdminIndex() {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
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
                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
                        <Menu.Item key="3">添加文章</Menu.Item>
                        <Menu.Item key="4">文章列表</Menu.Item>
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
                        <Route exact path="/admin/index"  component={AddArticle} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );


}
export default AdminIndex;