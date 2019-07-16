import React from 'react';
import { Card } from 'antd';
import CardList from "./Card/card"
import ImgList  from "./ImgList/ImgList"
import ConLeftHome from "../ConLeftHome/ConLeftHome"
import "./content.scss"
import ConLeftArticle from "../ConLeftArticle/ConLeftArticle";
import ConLeftStory from "../ConLeftStory/ConLeftStory";
import HomeArticleInfo from "../HomeArticleInfo/HomeArticleInfo"
import ArticleMore from "../ArticleMore/ArticleMore"
import StoryMore from "../StoryMore/StoryMore"
import { Link, withRouter, Redirect, Switch, Route } from "react-router-dom"
import Login from "../Login/Login";
import loadArticle from "../ConLeftHome/axios"
const { Meta } = Card;
let myData = [];
let showData = true;
export default class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imglist: [
                { src: "https://img.jj59.com/2/5a71806a8b1a.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/8/5a717aa6a2de.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/5/5a717a7fe476.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/7/5a717a222c46.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/4/5a71794aaefe.jpg", title: "心语心愿" }
            ],
            articleData: myData,
            showData
        }
    }
    componentDidMount() {
        loadArticle("感动心灵").then(result => {
            let newData = result.data;
            if(newData.code === 0){
                myData = newData.article;
                this.setState({
                    showData: false,
                    articleData: newData.article
                });
            }
        });
    }
    render(){
        const {articleData, showData} = this.state;
        return (
            <div className="content">
                <Switch>
                    <Route path={"/home"} component={ConLeftHome}></Route>
                    <Route path={"/article"} component={ArticleMore} exact></Route>
                    <Route path={"/story"} component={StoryMore}></Route>
                    <Route path={"/articleInfo/:a_id"} component={HomeArticleInfo} exact></Route>
                    {/*<Route path={"/article/more/:type"} component={ArticleMore} exact></Route>*/}
                    <Redirect to={"/home"}></Redirect>
                </Switch>
                <div className="content-right">
                    <Card
                            size="small"
                            loading={showData}
                            title="推荐阅读"
                            style={{ width: 300, marginBottom: 10  }}
                            >
                        {articleData.slice(5, 11).map((val, index) => (
                            <Link to={"/articleInfo/" + val.a_id} key={val.a_id}>
                                <p>{val.title}</p>
                            </Link>
                        ))}
                            </Card>
                    <Card
                            size="small"
                            title="热门阅读"
                            loading={showData}
                            style={{ width: 300, marginBottom: 10  }}
                            >
                            {/*<a href=""><p>现在很少有这么感动的故事了</p></a>*/}
                            {/*<a href=""><p>地球的另一个你</p></a>*/}
                            {/*<a href=""><p>我这边一切都很好</p></a>*/}
                            {/*<a href=""><p>如果注定要一个人走</p></a>*/}
                            {/*<a href=""><p>我可以抱你一下吗</p></a>*/}
                            {/*<a href=""><p>谢谢你，让我成为你想要的模样</p></a>*/}
                            {/*<a href=""><p>明明还爱着，凭什么要错过。</p></a>*/}
                            {/*<a href=""><p>执子之手与子偕老</p></a>*/}
                        {articleData.slice(12, 20).map((val, index) => (
                            <Link to={"/articleInfo/" + val.a_id} key={val.a_id}>
                                <p>{val.title}</p>
                            </Link>
                        ))}
                            </Card>
                </div>
            </div>
        )
    }
}

