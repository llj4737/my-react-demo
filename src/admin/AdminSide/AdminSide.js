import React from 'react';
import "./adminside.scss"
import SideNav from "./SideNav/SideNav"
import { Link, NavLink } from "react-router-dom"
import {withRouter} from "react-router-dom";
import store from "../../store"
class AdminSide extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nav: [
                { color: "#5495e7", redirectTo: this.props.match.url + "/home", icon: "iconfont icon-userinfo", title: "用户信息" },
                { color: "#f31e1e", redirectTo: this.props.match.url + "/article", icon: "iconfont icon-fabiaowenzhang", title: "发表文章" },
                { color: "#f31e1e", redirectTo: this.props.match.url + "/articlelist", icon: "iconfont icon-liebiao", title: "我的文章" },
                { color: "#f4ea2a", redirectTo: this.props.match.url + "/collection", icon: "iconfont icon-shoucang", title: "我的收藏" },
                { color: "#03a5e4", redirectTo: this.props.match.url + "/history", icon: "iconfont icon-icon_history", title: "历史纪录" }
            ],
            name: store.getState().username
        };
        store.subscribe(this.storeChange);
    }
    storeChange = () => {
        this.setState({
            name: store.getState().username
        })
    }
    render(){
        return (
            <div className={"admin-side"}>
                <div className={"admin-avatar"}>
                    <img src="/img/avatar.png" alt=""/>
                    <div className={"avatar-right"}>
                        <h3>{this.state.name}</h3>
                        <p>简介: 前端工程师</p>
                    </div>
                </div>
                { this.state.nav.map((val, index) => (
                    <NavLink to={val.redirectTo} key={index}
                          activeClassName={"active"}
                             style={{display: "block"}}
                    >
                        <SideNav {...val}/>
                    </NavLink>
                ))}
            </div>
        )
    }
}
export default withRouter(AdminSide);