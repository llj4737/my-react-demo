import React from 'react';
import axios from "axios";
import {
    Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import store from "../../store";
import moment from 'moment';

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);
const Editor = ({
                    onChange, onSubmit, submitting, value,
                }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
                style={{backgroundColor: "#44a203", borderColor: "#44a203"}}
            >
                添加评论
            </Button>
        </Form.Item>
    </div>
);
export default class HomeArticleInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleData: {},
            comments: [],
            submitting: false,
            value: ''
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getArticleById();
    }
    getArticleById = () => {
        let data = JSON.stringify({a_id: this.props.match.params.a_id});
        axios.post("http://localhost:8081/homeArticle/movingheart", data, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(result => {
            let newData = result.data;
            if(newData.code === 0){
                this.setState({
                    articleData: newData.article[0]
                });
            }
        });
    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: store.getState().username,
                        avatar: '/img/avatar.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    render(){
        const {articleData, comments, submitting, value} = this.state;
        return (

            <div style={{padding: "10px 30px 10px 100px", background: "white", marginBottom: 10, marginRight: 10}}>
                <div>
                    <h2 style={{textAlign: "center"}}>{articleData.title}</h2>
                    <div style={{textAlign: "center", marginBottom: 10}}>{articleData.author}</div>
                    <div style={{lineHeight: 2, textIndent: "2em", fontSize: 16}} dangerouslySetInnerHTML={{ __html: articleData.content }}></div>
                </div>
                <div>
                    {comments.length > 0 && <CommentList comments={comments} />}
                    <Comment
                        avatar={(
                            <Avatar
                                src="/img/avatar.png"
                                alt="Han Solo"
                            />
                        )}
                        content={(
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={value}
                            />
                        )}
                    />
                </div>
            </div>
        )
    }
}