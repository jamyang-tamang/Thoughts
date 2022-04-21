import {React, useState, useEffect} from 'react';
import './App.css';
import {auth} from'./firebase-config';
import Canvas from "./components/Canvas/Canvas";
import InteractionView from "./components/Interaction/InteractionView"
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import DiscussionCommentView from './components/Discussions/DiscussionCommentView';
import {signOut} from'firebase/auth';
  
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

    const logout = async () => {
        await signOut(auth);
        sessionStorage.setItem('user', "");
        goToLogin();
    };

    const goToForgotPassword = () => {
        setPage("ForgotPassword");
    }

    const goToHome = () => {
        setPage("Home");
    }

    const goToInteractions = () => {
        setPage("Interactions");
    }

    const goToDiscussions = () => {
        setPage("Discussions");
    }

    function Application() {
        
        if(Page === "Home") {
            return ( <div className="App">
                        <Canvas logout={logout} goToInteractions={goToInteractions} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
                    </div>);
            }
        if(Page === "Discussions") {
                    return <div className="App">
                        <DiscussionCommentView logout={logout} goToHome={goToHome} goToInteractions={goToInteractions} goToLogin={goToLogin}/>
                    </div>
            }
        if(Page === "Interactions") {
                    return <div className="App">
                        <InteractionView logout={logout} goToHome={goToHome} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
                    </div>
                
            }
        if(Page === "Login") {   
                return <div className="App">
                        <Login goToHome={goToHome} goToForgotPassword={goToForgotPassword}/>
                    </div>
            }
        if(Page === "ForgotPassword") {
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