import {React, useState, useEffect} from 'react';
import './App.css';
import Canvas from "./Canvas";
import Messages from "./Messages"
import Discussions from "./Discussions";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

function getPage() {
    const activePage = sessionStorage.getItem("Page");
    if (!activePage) {
      return "Login";
    }
    return JSON.parse(activePage);
  }

const App = () => {
    const [Page, setPage] = useState(getPage)

    useEffect(() => {
        sessionStorage.setItem('Page', JSON.stringify(Page));
    }, [Page]);   

    const goToLogin = () => {
        setPage("Login");
    }

    const goToForgotPassword = () => {
        setPage("ForgotPassword");
    }

    const goToHome = () => {
        setPage("Home");
    }

    const goToMessages = () => {
        setPage("Messages");
    }

    const goToDiscussions = () => {
        setPage("Discussions");
    }

    function Application() {
        
        if(Page === "Home") {
            return ( <div className="App">
                        <Canvas goToMessages={goToMessages} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
                    </div>);
            }
        if(Page === "Discussions") {
                    return <div className="App">
                        <Discussions goToHome={goToHome} goToMessages={goToMessages} goToLogin={goToLogin}/>
                    </div>
            }
        if(Page === "Messages") {
                    return <div className="App">
                        <Messages goToHome={goToHome} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
                    </div>
                
            }
        if(Page == "Login") {   
                return <div className="App">
                        <Login goToHome={goToHome} goToForgotPassword={goToForgotPassword}/>
                    </div>
            }
        if(Page == "ForgotPassword") {
                return <div className="App">
                        <ForgotPassword goToLogin={goToLogin}/>
                    </div>
        }
    }

    return(
        <Application/>
    )
};

export default App;