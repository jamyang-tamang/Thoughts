import React from "react";
import {useState} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from './firebase-config'
import Modal from 'react-modal'

Modal.setAppElement(this);

const Login = (props) => {
    const [user, setCurrentUser] = useState ({});
    const [registerEmail, setRegisterEmail] = useState ("");
    const [registerPassword, setRegisterPassword] = useState ("");
    const [loginEmail, setLoginEmail] = useState ("");
    const [loginPassword, setLoginPassword] = useState ("");
    const [modalIsOpen, setModalOpen] = React.useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState ("");
    const [signUpErrorMessage, setSignupErrorMessage] = useState ("");

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
    })

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }
    

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword);
            console.log(user);
            setSignupErrorMessage("");
        } catch (error) {
            console.log(error.message);
            setSignupErrorMessage(error.code);
            
        }
    };

    const login = async() => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword);
            console.log(user);
            setLoginErrorMessage("");
        } catch (error) {
            console.log(error.message);
            setLoginErrorMessage(error.code);
        }
    };

    const logout = async () => {
        await signOut(auth)
    };
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    return(
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <div>
                    <h2>Sign Up</h2>
                    <h4>It's quick and easy!</h4>
                    <button onClick={closeModal}>X</button>
                </div>
                <div>
                    <input type="text" placeholder="Email"  
                    onChange={(event) => {
                        setRegisterEmail(event.target.value)
                    }}/>    
                    <input type="password" placeholder="Password" 
                    onChange={(event) => {
                        setRegisterPassword(event.target.value)
                    }}/>
                </div>
                <h6>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.</h6> 
                <h6> You may receive SMS Notifications from us and can opt out any time.</h6>
                <p style={{color:'red'}}>{signUpErrorMessage}</p>
                <button onClick={register}>Sign Up</button>
            </Modal>

            <div style = {{textAlign: "center"}}>
                <div>
                <h2>Login</h2>
                <input type="text" placeholder="Email"
                onChange={(event) => {
                    setLoginEmail(event.target.value)
                }} />
                <input type="password" placeholder="Password"
                onChange={(event) => {
                    setLoginPassword(event.target.value)
                }} />
                
                <button onClick={login}>Login</button>
                <p style={{color:'red'}}>{loginErrorMessage}</p>

                
                </div>
                <button onClick={openModal}>Crete new account</button>
                <h3>User : {user?.email}</h3>
                <button onClick={logout}>logout?</button>
                {/* <button onClick={props.goToForgotPassword}>ForgotPassword?</button> */}
            </div>
        </div>
    )
}

export default Login;