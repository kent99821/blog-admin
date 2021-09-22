import React,{useState} from 'react'
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Login_logo from '../assets/logo.svg'
import axios from 'axios';
import '../assets/css/Login.css'
import servicePath from '../config/apiUrl';
 function Login (props) {

const[userName, setUserName] = useState('');
const[password, setPassword] = useState('');
const[isLoading, setIsLoading] = useState(false);
const formRef = React.createRef();

const onReset = () => {
    this.formRef.current.resetFields();
};
const adminLogin = ()=>{
    setIsLoading(true);
    if(!userName){
        message.error("用户名不能为空");
        setTimeout(()=>{
            setIsLoading(false);
        },1000)
    }else if(!password){
        message.error("密码不能为空");
        setTimeout(()=>{
            setIsLoading(false);
        },1000)
    }
    let paramData = {
        'userName':userName,
        'password':password
    }
  try {
    axios({
        method: 'post',
        url: servicePath.checkLogin,
        data: paramData,
        withCredentials:true,
    }).then(res=>{
        setIsLoading(false);
        if(res.data.data.code === 200){
           
            window.sessionStorage.setItem('token',res.data.data.token);
            message.success('登录成功');
            props.history.push('/admin');
        }else{
            message.error('用户名密码错误');
        }
    })
  } catch (error) {
    //   console.log(error.response.data);
  message.error('系统出错')
  }
    setTimeout(()=>{
        setIsLoading(false);
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
                        <Input 
                        prefix={<UserOutlined
                         className="site-form-item-icon" />} 
                         placeholder="Username" 
                         onChange={(e)=>{setUserName(e.target.value)}}
                         />
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
                            onChange={(e)=>{setPassword(e.target.value)}}
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

