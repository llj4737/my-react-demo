import React from 'react';
import "./admin-home.scss"
import AdminHeader from "../AdminHeader/AdminHeader"
import AdminSide from "../AdminSide/AdminSide"
import AdminCon from "../AdminCon/AdminCon"

export default class AdminHome extends React.Component {
    render(){
        return (
            <div className={"admin-home"}>
                <AdminHeader/>
                <div className={"admin-con"}>
                    <AdminSide></AdminSide>
                    <AdminCon></AdminCon>
                </div>
            </div>
        )
    }
}