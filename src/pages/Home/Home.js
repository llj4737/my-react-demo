import React from 'react';
import Header from "../Header/Header"
import Content from "../Content/Content"
import Footer from "../Footer/Footer"

export default class Home extends React.Component {
    componentDidMount() {
        // this.props.history.push("/home");
    }

    render(){
        return (
            <div>
               <Header/>
               <Content/>
               <Footer/>
            </div>
        )
    }
}