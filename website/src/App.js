import React from 'react';
import './App.css';
import Canvas from "./Canvas";
import Messages from "./Messages"
import Discussions from "./Discussions";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import {auth} from './firebase-config';
import {onAuthStateChanged} from'firebase/auth';

class App extends React.Component {
    constructor(){
        super()
        this.state ={
            Page: "Home"
        }
    }

    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if(user){
                this.setState({
                    Page: "Discussions"
                });
            }
        });
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
                    <Canvas goToLogin={this.goToLogin} goToMessages={this.goToMessages} goToDiscussions={this.goToDiscussions}/>
                </div>
            )
        }
        if(this.state.Page === "Discussions") {
            return (
                <div className="App">
                    <Discussions goToLogin={this.goToLogin} goToHome={this.goToHome} goToMessages={this.goToMessages}/>
                </div>
            )
        }
        if(this.state.Page === "Messages") {
            return (
                <div className="App">
                    <Messages goToLogin={this.goToLogin} goToHome={this.goToHome} goToDiscussions={this.goToDiscussions}/>
                </div>
            )
        }
        if(this.state.Page ==="Login") {
            return (
                <div className="App">
                    <Login goToHome={this.goToHome} goToForgotPassword={this.goToForgotPassword}/>
                </div>
            )
        }
        if(this.state.Page === "ForgotPassword") {
            return (
                <div className="App">
                    <ForgotPassword goToLogin={this.goToLogin}/>
                </div>
            )
        }
    }
}

export default App;