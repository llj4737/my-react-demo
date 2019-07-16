import React from 'react';
import "./header.scss"
import {
    Menu, Dropdown, Icon, message, Input
} from 'antd';
import { NavLink, Link, withRouter, Redirect, Switch, Route } from "react-router-dom";
import ConLeftHome from "../ConLeftHome/ConLeftHome";
import ConLeftArticle from "../ConLeftArticle/ConLeftArticle";
import ConLeftStory from "../ConLeftStory/ConLeftStory";
import Login from "../Login/Login";
import store from "../../store/index";

const Search = Input.Search;
class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            navInfo: [
                {name: "首页", link: "/home"},
                {name: "文章", link: "/article"},
                {name: "故事", link: "/story"}
            ],
            loginInfo: store.getState()
        }
    }
    componentDidMount() {

    }

    handleClickTo = (link) => {
        // this.props.history.replace(link)
    }

    render(){
        const menu = (
            <Menu style={{marginLeft: 100}}>
                <Menu.Item key="1"><span style={{color: "#06c6b7", marginRight: 4}} className={"iconfont icon-huanying"}></span>欢迎: {this.state.loginInfo.username}</Menu.Item>
                <Menu.Item key="2"><Link to={"/admin/" + this.state.loginInfo.userId}><span style={{color: "#5ac44c", marginRight: 4}} className={"iconfont icon-yonghuguanli"}></span>用户管理</Link></Menu.Item>
                <Menu.Item key="3"><span style={{color: "#ffd16e", marginRight: 4}} className={"iconfont icon-tuichudenglu"}></span>退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div className="header">
                <div style={{width: 1500}}>
                    <h2>感动驻马店</h2>
                    <div className={"nav-wrapper"}>
                        {this.state.navInfo.map((val, index)=> (
                            <NavLink to={val.link}
                                     // onClick={() => this.handleClickTo(val.link)}
                                     // replace
                                     activeClassName={"active"}
                                  >
                                {val.name}
                            </NavLink>))}
                    </div>
                    <div className="right-search">
                        <div>
                            <input type="text" placeholder="search..."/>
                            <button>搜索</button>
                        </div>
                    </div>
                    {
                        this.state.loginInfo.isLogin ? (
                            <div className="avatar"><img src="/img/avatar.png" alt=""/>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <span>
                                        <Icon type="down" />
                                    </span>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="login">
                                <div onClick={()=>{this.toLogin("login")}}><Link to={"/login"}>登录</Link></div>
                                <div onClick={()=>{this.toLogin("register")}}><Link to={"/register"}>注册</Link></div>
                            </div>
                        )
                    }


                </div>
            </div>
        )
    }
    toLogin = (toWhere) => {
        return (
            <Redirect to={toWhere}/>
        );
    }
}
export default withRouter(Header)