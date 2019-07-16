import React from 'react';
import "./sidenav.scss"

export default class SideNav extends React.Component {
    render(){
            {/*<div className={"sidenav " + (this.props.isActive ? "active" : "")}>*/}
        return (
            <div className={"sidenav"}>
                <span className={this.props.icon} style={{color: this.props.color}}></span>
                <span>{this.props.title}</span>
            </div>
        )
    }
}