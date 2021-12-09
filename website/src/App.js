import React from 'react';
import './App.css';
import Canvas from "./Canvas";
import Messages from "./Messages"
import Discussions from "./Discussions";

class App extends React.Component {

    constructor(){
        super()
        this.state = {
            Page: "Home"
        }
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
                    <Canvas goToMessages={this.goToMessages} goToDiscussions={this.goToDiscussions}/>
                </div>
            )
        }
        if(this.state.Page === "Discussions") {
            return (
                <div className="App">
                    <Discussions goToHome={this.goToHome} goToMessages={this.goToMessages}/>
                </div>
            )
        }
        if(this.state.Page === "Messages") {
            return (
                <div className="App">
                    <Messages goToHome={this.goToHome} goToDiscussions={this.goToDiscussions}/>
                </div>
            )
        }

    }
}

export default App;