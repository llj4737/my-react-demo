import React from 'react';
import UserInfo from "../UserInfo/UserInfo";
import Article from "../Article/Article";
import ArticleList from "../ArticleList/ArticleList";
import ArticleInfo from "../ArticleInfo/ArticleInfo"
import Collection from "../Collection/Collection";
import History from "../History/History";
import "./admincon.scss"

import { Route, Switch, Redirect } from "react-router-dom";

export default class AdminCon extends React.Component {
    render(){
        return (
            <div className={"admin-main"}>
                <Switch>
                    <Route path={"/admin/:id/home"} component={UserInfo}></Route>
                    <Route path={"/admin/:id/article"} component={Article}></Route>
                    <Route path={"/admin/:id/articlelist"} exact component={ArticleList}></Route>
                    <Route path={"/admin/:id/articlelist/:a_id"} component={ArticleInfo}></Route>
                    <Route path={"/admin/:id/collection"} component={Collection}></Route>
                    <Route path={"/admin/:id/history"} component={History}></Route>
                    <Redirect to={"/admin/:id/home"}></Redirect>
                </Switch>
            </div>
        )
    }
}