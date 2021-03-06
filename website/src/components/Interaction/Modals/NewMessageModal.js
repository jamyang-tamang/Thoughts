import React from "react";
import { useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import {Container} from '@mui/material'
import { db } from "../../../firebase-config";
import {collection, query, addDoc, where, onSnapshot} from "firebase/firestore";
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from 'react-modal'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

const NewMessageModal = (props) => {
    const [userToSendToPresent, toggleUserPresent] = useState(false);
    const [userToSendTo, setUserToSendTo] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [newMessageErrorMessage, setNewMessageErrorMessage] = useState ("");

    const threadRef = collection(db, 'messageThread');

    const sendNewMessage = () => {
        setNewMessageErrorMessage("");
        if(userToSendTo === sessionStorage.getItem('user')){
            setNewMessageErrorMessage("You can't send a message to yourself!!!!");
        }
        else{
            const q = query(collection(db, "users"), where("email", "==", userToSendTo));
            let x = query (collection(db, "messageThread"), where("specialKey", "in", [sessionStorage.getItem('user')+userToSendTo, userToSendTo+sessionStorage.getItem('user')]));
            onSnapshot(q, (querySnapshot) => {
                if(querySnapshot.size > 0 ){
                    onSnapshot(x, (newQuerySnapshot) => {
                        if(newQuerySnapshot.size === 0 ){
                            addDoc(threadRef, {
                                createdAt: Date().toLocaleString(),
                                specialKey: userToSendTo+sessionStorage.getItem('user'),
                                participants: [userToSendTo, sessionStorage.getItem('user')]
                            })
                            .then(() => {
                                resetModalForm()
                            })
                        }
                        else{
                            setNewMessageErrorMessage("Thread with that email already exists");
                        }
                    })
                }
                else{
                    setNewMessageErrorMessage("No user with that email found");
                }
            })
        }
    }

    useEffect(()=> {
        if(userToSendTo !== "")
            toggleUserPresent(true);
        toggleUserPresent(false);
    }, [userToSendTo]);

    const resetModalForm = () => {
        setUserToSendTo("");
        setNewMessageErrorMessage("");
        props.closeModal();
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor: '#ADD8E6',
          transform: 'translate(-50%, -50%)',
        },
    };

    return(
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={resetModalForm}
        style={customStyles}
        ariaHideApp={false}
        >
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'tertiary.main' }}>
            <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Who do you want to send message to?
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="standard-basic"
                    label="Recipient"
                    name="email"
                    autoComplete=""
                    onChange={(event) => {
                        setUserToSendTo(event.target.value)
                    }}
                    />
                </Grid>
            </Grid>

            <Typography component="p" variant="h6" color="red" >
                {newMessageErrorMessage}
              </Typography>
                <Grid container justifyContent="flex-end">
                    <Grid item justifyContent="flex-end" sx={{marginTop: 3}}>
                        <Button sx={{marginRight: 3}}>
                            <CancelIcon color="secondary" fontSize="large" onClick={resetModalForm} />
                        </Button>
                        <Button  disabled={userToSendToPresent} sx={{marginRight: 3}}>
                            <SendIcon color="success" fontSize="large" onClick={sendNewMessage} />
                        </Button>
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
</Modal>);
}
export default NewMessageModal