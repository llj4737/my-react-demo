import React from 'react';
import axios from "axios";
import { Card } from 'antd';
import "./articleInfo.scss"
export default class ArticleInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            a_id: this.props.match.params.a_id,
            articleInfo: {}
        }
    }
    componentDidMount() {
        this.getArticleById();
    }
    getArticleById = () => {
        const {a_id} = this.state;
        axios.get("http://localhost:8081/article/getArticleById?a_id=" + a_id)
            .then(res => {
                let data = JSON.parse(res.data);
                if(data.code === 0){
                    this.setState({
                        articleInfo: data.article[0]
                    });
                }
            })
    }

    render(){
        const {articleInfo} = this.state;
        return (
            <div className={"article-info"}>
                <Card
                    title={articleInfo.title}
                    style={{ width: "100%" }}
                >
                    <div className={"article-container"} dangerouslySetInnerHTML={{ __html: articleInfo.content }} ></div>
                </Card>
            </div>
        )
    }
}