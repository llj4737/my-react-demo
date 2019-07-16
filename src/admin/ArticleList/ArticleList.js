import React from 'react';
import {List, Card, Avatar, Icon, Button, Modal} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../store";

import "./articlelist.scss"
const confirm = Modal.confirm;
export default class ArticleList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listData: [],
        }
    }
    componentDidMount() {

        this.loadArticleList();
    }
    loadArticleList = () => {
        axios.get("http://localhost:8081/article/getArticleList?id=" + store.getState().userId)
            .then(result => {
                let data = JSON.parse(result.data);
                if(data.code === 0){
                    this.setState({
                        listData: data.articlelist
                    });
                }
        });
    }

    render(){
        const { listData } = this.state;
        return (
            <div>
                <Card
                    title="文章列表"
                    style={{ width: "100%" }}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={"/img/avatar.png"} />}
                                    title={<Link to={this.props.match.url + "/"+ item.a_id}  className={"content-title"}>标题: {item.title}</Link>}
                                    description={"分类: " + item.category}
                                />
                                <Button type={"primary"} style={{float: "right"}} onClick={() => this.showDeleteConfirm(item.a_id)}>删除</Button>
                                {/*<p className={"analysisHtml"} dangerouslySetInnerHTML={{ __html: item.content }}  />*/}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        )
    }

    showDeleteConfirm = (a_id) => {
        let self = this;
        confirm({
            title: `Are you sure delete this article ${a_id}?`,
            content: `This operation cannot be restored`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.get("http://localhost:8081/article/deleteArticle?a_id=" + a_id)
                    .then(result => {
                        let data = JSON.parse(result.data);
                        if(data.code === 0){
                            self.loadArticleList();
                        }
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
}