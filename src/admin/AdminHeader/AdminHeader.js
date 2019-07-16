import React from 'react';
import "./adminheader.scss";
import { withRouter } from "react-router-dom"

class AdminHeader extends React.Component {
    render(){
        return (
            <div className={"admin-header"}>
                <h2>基于React+Nodejs+SSM的后台管理系统</h2>
                <span onClick={this.clickHandler} title={"退出"} className={"iconfont icon-tuichu1"} style={{color: "#f39021", fontSize: 22}}></span>
            </div>
        )
    }
    clickHandler = () => {
        this.props.history.push("/");
    }
}

export default withRouter(AdminHeader)