import {React, useState, useEffect} from 'react';
import './App.css';
import {auth} from'./firebase-config';
import Canvas from "./components/Canvas/Canvas";
import MessageView from "./components/Interaction/MessagesView"
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import DiscussionCommentView from './components/Discussions/DiscussionCommentView';
import {signOut} from'firebase/auth';
  
function getPage() {
    // if(userPresent){
        const activePage = sessionStorage.getItem("Page");
        if (!activePage) {
            return "Login";
        }
        return JSON.parse(activePage);
    // }
    // else{
    //     return "Login";
    // }
  }

const App = () => {
    const [Page, setPage] = useState(getPage)
    // const [userPresent, setUserPresenece] = useState(false);

    // onAuthStateChanged(auth, user=> {
    //     if(user != null){
    //       userPresent = true;
    //     }
    //     else{
    //       userPresent = false;
    //     }
    //   })
  
      
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

    const goToMessages = () => {
        setPage("Messages");
    }

    const goToDiscussions = () => {
        setPage("Discussions");
    }

    function Application() {
        
        if(Page === "Home") {
            return ( <div className="App">
                        <Canvas logout={logout} goToMessages={goToMessages} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
                    </div>);
            }
        if(Page === "Discussions") {
                    return <div className="App">
                        <DiscussionCommentView logout={logout} goToHome={goToHome} goToMessages={goToMessages} goToLogin={goToLogin}/>
                    </div>
            }
        if(Page === "Messages") {
                    return <div className="App">
                        <MessageView logout={logout} goToHome={goToHome} goToDiscussions={goToDiscussions} goToLogin={goToLogin}/>
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