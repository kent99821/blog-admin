import React,{useState} from 'react'
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Login_logo from '../assets/logo.svg'
import axios from 'axios';
import '../assets/css/login.css'

 function Login () {

const[userName, setUserName] = useState('');
const[password, setPassword] = useState('');
const[isLoading, setIsLoading] = useState(false);
const formRef = React.createRef();
   const onFinish = values => {
       console.log("表单验证");
       setIsLoading(true)
       setTimeout(()=>{
           setIsLoading(false)
       },1000)
    // axios.post(`http://118.178.125.139:8060/adminLogin?password=${values.password}&username=${values.username}`)
    //     .then((resp) => {
    //         window.sessionStorage.setItem('token', resp.data.extended.token);

    //         this.props.history.push('/admin')
    //         message.success('登录成功!!!')
    //     })
    //     .catch((erro) => {
    //         message.error('登录失败...')
    //     })
};

const onReset = () => {
    this.formRef.current.resetFields();
};
const adminLogin = ()=>{
    setIsLoading(true)
    setTimeout(()=>{
        setIsLoading(false)
    },1000)
}
return (
        <div className="login_container">
            <div className='avatar_box'>
                <img src={Login_logo} className='login_logo' alt='login_logo' />
            </div>
           
            <Card className='login_box' title='管理员'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                     <Spin tip="loading..." spinning={isLoading}> 
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '长度在3-10',
                                min: 3,
                                max: 10
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button sub" onClick={adminLogin}>
                            登录
                        </Button>
                        <Button htmlType="button" onClick={onReset} className="login-form-button res">
                            重置
                        </Button>
                    </Form.Item>
                    </Spin>
                </Form>


            </Card>
            
        </div>
    )

} 
export default Login;

