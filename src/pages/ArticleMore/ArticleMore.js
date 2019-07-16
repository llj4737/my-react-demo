import React from 'react';
import loadArticle from "../ConLeftHome/axios";
import "./articlemore.scss";
import {Link} from "react-router-dom";
import {
    List, Avatar, Button, Skeleton, Spin
} from 'antd';
let myArticleData = new Array(10).fill(10);
let loading = true;
export default class ArticleMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading,
            articleData: myArticleData
        }
    }
    componentDidMount() {
        loadArticle("感动心灵").then(res => {
            let data = res.data;
            if(data.code === 0){
                myArticleData = data.article;
                loading = false;
                this.setState({
                    loading: false,
                    articleData: data.article
                });
            }
        })
    }

    render(){
        const {articleData} = this.state;
        return (
            <div className={"article-more"}>
                <List
                    itemLayout="horizontal"
                    dataSource={articleData}
                    renderItem={item => (
                        <List.Item>
                            <Spin spinning={this.state.loading} style={{margin: "100px 200px"}}></Spin>
                            <List.Item.Meta
                                title={<Link to={"/articleInfo/" + item.a_id}>{item.title}</Link>}
                                description={<div dangerouslySetInnerHTML={{ __html: (item.content && item.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, "").replace(/(<p>|<\/p>)/g, "")) }}></div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}