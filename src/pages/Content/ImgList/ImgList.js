import React from 'react';
import "./ImgList.scss"

export default class ImgList extends React.Component {
    render(){
        return (
            <div className={"imglist"}>
                <img src={this.props.image} alt=""/>
                <p>{this.props.title}</p>
            </div>
        )
    }
}