import React from 'react';
import { Card, List, Typography,Button, Radio, Modal, Input, Form, Icon, message } from 'antd';
import "./userInfo.scss"
import axios from "axios";
import store from "../../store/index";
import {changeUserNameActionCreator} from "../../store/actionCreator";

class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.refInput = React.createRef();
        this.state = {
            visible: false,
            confirmLoading: false,
            titles: [
                {ch: "用户名", en: "username", icon: "user", errorMethod: this.validateToUserName,msg: "用户名必须3~16位", pattern: /^[\w\W]{3,16}$/},
                {ch: "密码", en: "password", icon: "lock", errorMethod: this.validateToPassword,msg: "密码8~16位字符，包含数字和字母", pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/},
                {ch: "电话号码", en: "telephone", icon: "mobile", errorMethod: this.validateToTelephone,msg: "手机号格式错误", pattern: /^1\d{10}$/}],
            selected: {},
            changeInfo: {
                id: store.getState().userId,
                username: "",
                password: "",
                telephone: ""
            },
            loginName: store.getState().username
        }
        store.subscribe(this.storeChange);
    }
    componentDidMount() {
        this.findInfoById();
    }
    storeChange = () => {
        const myChange = this.state.changeInfo;
        myChange.id = store.getState().userId;
        this.setState({
            changeInfo: myChange
        });
    }
    findInfoById = () => {
        axios.get("http://localhost:8081/getUserInfo?id="+this.state.changeInfo.id)
            .then(res => {
                let data = res.data;
                if(data.code === 0){
                    let {id, username, password, telephone} = data.user;
                    this.setState({
                        changeInfo: {id, username, password, telephone}
                    });
                }
            });
    }

    render(){
        let {changeInfo} = this.state;
        const data = [
            "用户名: " + changeInfo.username,
            "密码: " + changeInfo.password,
            "电话号码: " + changeInfo.telephone
        ];
        let {visible, confirmLoading, selected} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={"userInfo"}>
                <Card
                    title="用户信息"
                    style={{ width: "100%" }}
                >
                    <List
                        bordered
                        dataSource={data}
                        renderItem={(item, index) => (<List.Item>
                            {item}
                            <Button type="danger" onClick={() => this.showModal(index)}>修改</Button>

                        </List.Item>)}
                    />
                    {visible && <Modal
                        title={selected.ch}
                        visible={visible}
                        onOk={() => this.handleOk(selected.en)}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <Form.Item>
                            {getFieldDecorator("xxx", {
                                rules: [{ message: "不能为空", type: 'string' }, {
                                    pattern: selected.pattern, message: selected.msg
                                }, {
                                    validator: selected.errorMethod,
                                }],
                            })(<Input prefix={<Icon type={selected.icon} />} onInput={(e) => this.inputChangeHandler(e, selected.en)}
                                      placeholder={selected.en} size={"large"} style={{marginBottom: 0, marginTop: 0}}/>)}
                        </Form.Item>
                    </Modal>}
                </Card>
            </div>
        )
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
    updateUserInfo = (type) => {
        let data = JSON.stringify({...this.state.changeInfo, type});
        console.log(data)
        axios.post("http://localhost:8081/updateUser", data, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(res => {
                let data = res.data;
                if(data.code === 0){
                    const action = changeUserNameActionCreator(this.state.changeInfo.username);
                    store.dispatch(action);
                    let sessionData = JSON.parse(sessionStorage.getItem("login"));
                    sessionData.username = this.state.changeInfo.username;
                    sessionStorage.setItem("login", JSON.stringify(sessionData));
                    message.success("修改成功", 1.5);
                }else {
                    message.error(data.msg, 1.5);
                }
                this.findInfoById();
            });
    }
    handleOk = (type) => {
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                if(values.xxx){
                    this.updateUserInfo(type);
                    setTimeout(() => {
                        this.setState({
                            visible: false,
                            confirmLoading: false,
                        });
                    }, 1000);
                    return;
                }
                this.setState({
                    visible: false,
                    confirmLoading: false
                });
            }else{
                this.setState({
                    visible: false,
                    confirmLoading: false
                });
                this.findInfoById();
            }

        });


    }
    showModal = (index) => {
        this.setState({
            visible: true,
            selected: this.state.titles[index]
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
        this.findInfoById();
    }
    inputChangeHandler(e, type){
        const myLogin = this.state.changeInfo;
        myLogin[type] = e.target.value;
        this.setState({
            changeInfo: myLogin
        });
    }

}

const WrappedRegistrationForm = Form.create({ name: 'userInfo' })(UserInfo);
export default WrappedRegistrationForm;