import React from 'react';
import { Card } from 'antd';
import "./login.scss"
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import axios from "axios";
import store from "../../store/index"
import { saveUserActionCreator } from "../../store/actionCreator";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginInfo: {
                username: "",
                password: ""
            },
            user: store.getState(),
            confirmDirty: false
        };
        store.subscribe(this.stateChangeHandler);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    stateChangeHandler = () => {
        this.setState({
            user: store.getState()
        });
    }
    saveLoginUserInfo = (info) => {
        const action = saveUserActionCreator(info);
        store.dispatch(action);
    }
    validateToUserName = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    validateToPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let heights = document.documentElement.clientHeight;
        return (
            <div className="userlogin" style={{height: heights}}>
                <Card
                    title="用户登录"
                    style={{ width: 350, height: 288, marginBottom: 10 }}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Form.Item>
                                {getFieldDecorator(`username`, {
                                    rules: [{ message: '不能为空', type: 'string' }, {
                                        pattern: /^[\w\W]{3,16}$/, message: '用户名必须3~16位'
                                    }, {
                                        validator: this.validateToUserName,
                                    }],
                                })(<Input prefix={<Icon type="user" />} onInput={(e) => this.inputChangeHandler(e, "username")}
                                          placeholder="username" size={"large"} style={{marginBottom: 0, marginTop: 10}}/>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator(`password`, {
                                    rules: [{ message: '不能为空', type: 'string' }, {
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码8~16位字符，包含数字和字母'
                                    }, {
                                        validator: this.validateToPassword,
                                    }],
                                })(<Input prefix={<Icon type="lock" />} type="password" onInput={(e) => this.inputChangeHandler(e, "password")} placeholder="password" size={"large"}  style={{marginBottom: 0}} />)}
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block size={"large"}>
                                登录
                            </Button>
                            <a href="http://localhost:3000/#/register" style={{float:"right", marginTop: "-6px"}}>立即注册</a>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        )
    }
    inputChangeHandler(e, type){
        const myLogin = this.state.loginInfo;
        myLogin[type] = e.target.value;
        this.setState({
            loginInfo: myLogin
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(values.username && values.password){
                    axios.post("http://localhost:8081/login", JSON.stringify(values), {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    }).then(result => {
                        let data = result.data;
                        console.log(data);
                        if(data.code === 0){
                            message.success("login success", 1);
                            setTimeout(() => {
                                this.props.history.push("/");
                            }, 800);
                            sessionStorage.setItem("login", JSON.stringify({id: data.user.id, username: values.username, isLogin: true}));
                            this.saveLoginUserInfo({id: data.user.id, username: values.username});
                        }else{
                            message.error('Username or password cannot be incorrect');
                        }
                    });
                }else{
                    message.error('Username or password cannot be empty');
                }
            }
        });
    }
}
const WrappedRegistrationForm = Form.create({ name: 'login' })(Login);
export default WrappedRegistrationForm;