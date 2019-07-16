import React from 'react';
import { Card } from 'antd';
import "../Login/login.scss"
import {
    Form, Icon, Input, Button, message
} from 'antd';
import axios from "axios"



class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                username: "",
                password: "",
                telephone: ""
            },
            confirmDirty: false
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
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
    validateToPhone = (rule, value, callback) => {
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
                    title="用户注册"
                    style={{ width: 350, height: 350, marginBottom: 10 }}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
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
                        <Form.Item>
                            {getFieldDecorator(`telephone`, {
                                rules: [{ message: '不能为空', type: 'string' }, {
                                    pattern: /^1\d{10}$/, message: '手机号格式错误'
                                }, {
                                    validator: this.validateToPhone,
                                }],
                            })(<Input prefix={<Icon type="mobile" />} type="password" onInput={(e) => this.inputChangeHandler(e, "telephone")} placeholder="telephone" size={"large"}  style={{marginBottom: 0}} />)}
                        </Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block size={"large"}>
                                注册
                            </Button>
                            <a href="http://localhost:3000/#/login" style={{float:"right", marginTop: 5}}>已经注册? 立即登录</a>
                    </Form>
                </Card>
            </div>
        )
    }
    inputChangeHandler(e, type){
        const myInfo = this.state.info;
        myInfo[type] = e.target.value;
        this.setState({
            info: myInfo
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(values.username && values.password && values.telephone){
                    axios.post("http://localhost:8081/register", JSON.stringify(values), {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    }).then(result => {
                        let data = result.data;
                        if(data.code === 0){
                            message.success("registration success", 1);
                            this.props.history.push("/login");
                        }else{
                            message.error("Registration failed, username already exists");
                        }
                    });
                }else{
                    message.error('Information cannot be empty');
                }
            }
        });
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
export default WrappedRegistrationForm;

