import React from "react";
import { useState, useEffect} from 'react';
import { IconButton } from '@material-ui/core';
import {Container} from '@mui/material'
import { db, auth } from "../../../firebase-config";
import {collection, addDoc} from "firebase/firestore";
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

    const threadRef = collection(db, 'messageThread');

    const sendNewMessage = () => {
        addDoc(threadRef, {
            createdAt: Date().toLocaleString(),
            participants: [userToSendTo, sessionStorage.getItem('user')]
        })
        .then(() => {
            resetModalForm()
        })
    }

    useEffect(()=> {
        if(userToSendTo !== "")
            toggleUserPresent(true);
        toggleUserPresent(false);
    }, [userToSendTo]);

    const resetModalForm = () => {
        setUserToSendTo("");
        props.closeModal();
    }

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
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
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
                <Grid container justifyContent="flex-end">
                    <Grid item justifyContent="flex-end">
                        <IconButton size="medium" color="secondary" onClick={props.closeModal}>
                            <CancelIcon/>
                        </IconButton>
                        <IconButton disabled={userToSendToPresent} size="medium" onClick={sendNewMessage}>
                            <SendIcon color="success"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
</Modal>);
}
export default NewMessageModal