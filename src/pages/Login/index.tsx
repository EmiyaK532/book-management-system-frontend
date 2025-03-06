import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { login } from '../../api/user';

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Login = () => {
  const navigate = useNavigate();

  //Form表单提交事件
  const onFinish = async (values: LoginUser) => {
    try {
      const res = await login(
        values.username,
        values.password,
      );

      if (
        res.status === 200 ||
        res.status === 201
      ) {
        message.success('登录成功');
        setTimeout(() => {
          //这里使用react路由跳转到首页
          navigate('/');
        }, 1000);
      } else {
        message.error('登录失败');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response.data.message);
    }
    console.log('success:', values);
  };

  return (
    <div id="login-container">
      <h1>图书管理系统</h1>
      <Form
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <Link to="/register">
              没有帐号去注册
            </Link>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
