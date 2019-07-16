import React from 'react';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import "./card.scss"
export default class CardList extends React.Component {
    render(){
        return (
            <li>
                <Link to={"/articleInfo/" + this.props.a_id}>
                    <Card
                        loading={this.props.loading}
                        title={this.props.title}
                        style={{ width: 750,height: 200 }}
                    >
                        <div className="card-con">
                            <img className={"cardimg"} src={this.props.image} alt=""/>
                            <div>
                                <p className="text" dangerouslySetInnerHTML={{ __html: (this.props.content && this.props.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, "").replace(/(<p>|<\/p>)/g, "")) }}></p>
                                <p className="read-msg">
                                    <p>
                                        <i className="iconfont icon-time" style={{margin: "0 5px 0 0"}}></i>
                                        <span>{this.props.date}</span>
                                        <i className="iconfont icon-pinglun" style={{margin: "0 5px 0 10px"}}></i>
                                        <span>0</span>
                                        <i className="iconfont icon-guankanyanjing" style={{marginLeft: "15px"}}></i>
                                        <span>{this.props.hits}</span>
                                    </p>
                                    <Link to={"/articleInfo/" + this.props.a_id}>阅读详情</Link>
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </li>
        )
    }
}