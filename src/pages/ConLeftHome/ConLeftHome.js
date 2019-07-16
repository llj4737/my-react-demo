import React from 'react';
import ImgList from "../Content/ImgList/ImgList";
import CardList from "../Content/Card/card"
import axios from "axios";
import { Card, Spin } from 'antd';
import loadArticle from "./axios";
import { Link } from "react-router-dom";
import "./conlefthome.scss"
let flag = true;
let myHeart = [];
let myStory = [];
let myPicCon = new Array(100).fill(1);
let active = true;
export default class ConLeftHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showHeart: active,
            showStory: active,
            showPicCon: active,
            movingheart: "感动心灵",
            movingstory: "感人故事",
            movingPicCon: myPicCon,
            heartData: myHeart,
            storyData: myStory,
            imglist: [
                { src: "https://img.jj59.com/2/5a71806a8b1a.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/8/5a717aa6a2de.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/5/5a717a7fe476.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/7/5a717a222c46.jpg", title: "心语心愿" },
                { src: "https://img.jj59.com/4/5a71794aaefe.jpg", title: "心语心愿" }
            ]
        }
    }
    componentDidMount() {
        if(flag){
            this.getArticleMovingHeart();
            this.getArticleMovingStory();
            this.getArticleMovingPic();
            flag = false;
            active = false;
        }
    }


    getArticleMovingHeart = () => {
           loadArticle("感动心灵").then(result => {
            let newData = result.data;
            if(newData.code === 0){
                myHeart = newData.article;
                this.setState({
                    showHeart: false,
                    heartData: newData.article
                });
            }
        });
    }
    getArticleMovingStory = () => {
        loadArticle("感人故事").then(result => {
            let newData = result.data;
            if(newData.code === 0){
                myStory = newData.article;
                this.setState({
                    showStory: false,
                    storyData: newData.article
                });
            }
        });
    }
    getArticleMovingPic = () => {
        loadArticle("精美图文").then(result => {
            let newData = result.data;
            if(newData.code === 0){
                myPicCon = newData.article;
                this.setState({
                    showPicCon: false,
                    movingPicCon: newData.article
                });
            }
        });
    }

    render(){
        const {movingPicCon, heartData, storyData, showStory, showHeart, showPicCon} = this.state;
        return (
            <div className="content-left">
                <Card
                    loading={showHeart}
                    title="感动心灵"
                    extra={<Link to={"/article"}>更多</Link>}
                    style={{ width: 369,height: 180  }}
                >

                    { heartData.slice(0, 3).map((val, index) => (<Link key={index} to={"/articleInfo/" + val.a_id}><p>{val.title}</p></Link>
                    )) }

                </Card>
                <Card
                    title="感人故事"
                    loading={showStory}
                    extra={<Link to={"/story"}>更多</Link>}
                    style={{ width: 369,height: 180 }}
                >

                    { storyData.slice(0, 3).map((val, index) => (<Link to={"/articleInfo/" + val.a_id} key={index}><p>{val.title}</p></Link>
                                    )) }
                </Card>
                <div className={"sec-img"}>
                    <Card title="精美图文" bordered={false} style={{ width: 750,marginTop: 10 }}>
                        <div className={"wrap-imglist"}>
                            {movingPicCon.slice(20, 25).map((val, index) => (
                                <Link to={"/articleInfo/" + val.a_id}><ImgList key={index} {...val}/></Link>
                            ))}
                        </div>
                    </Card>
                </div>

                <ul>
                    {movingPicCon.slice(3,6).map((val, index) => <CardList loading={showPicCon} {...val} />)}
                </ul>
            </div>
        )
    }
}