import React from 'react';
import './App.css';
import Canvas from "./Canvas";
import Messages from "./Messages"
import Discussions from "./Discussions";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

class App extends React.Component {

    constructor(){
        super()
        this.state ={
            Page: "Discussions"
        }
    }

    goToLogin = () => {
        this.setState({
            Page: "Login"
        });
    }

    goToForgotPassword = () => {
        this.setState({
            Page: "ForgotPassword"
        });
    }

    goToHome = () => {
        this.setState({
            Page: "Home"
        });
    }

    goToMessages = () => {
        this.setState({
            Page: "Messages"
        });
    }

    goToDiscussions = () => {
        this.setState({
            Page: "Discussions"
        });
    }

    render() {
        if(this.state.Page === "Home") {
            return (
                <div className="App">
                    <Canvas goToMessages={this.goToMessages} goToDiscussions={this.goToDiscussions} goToLogin={this.goToLogin}/>
                </div>
            )
        }
        if(this.state.Page === "Discussions") {
            return (
                <div className="App">
                    <Discussions goToHome={this.goToHome} goToMessages={this.goToMessages} goToLogin={this.goToLogin}/>
                </div>
            )
        }
        if(this.state.Page === "Messages") {
            return (
                <div className="App">
                    <Messages goToHome={this.goToHome} goToDiscussions={this.goToDiscussions} goToLogin={this.goToLogin}/>
                </div>
            )
        }
        if(this.state.Page == "Login") {
            return (
                <div className="App">
                    <Login goToHome={this.goToHome} goToForgotPassword={this.goToForgotPassword}/>
                </div>
            )
        }
        if(this.state.Page == "ForgotPassword") {
            return (
                <div className="App">
                    <ForgotPassword goToLogin={this.goToLogin}/>
                </div>
            )
        }
    }
}

export default App;