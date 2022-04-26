import React from "react";
import { useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import {Container} from '@mui/material'
import { db } from "../../../firebase-config";
import CreateIcon from '@mui/icons-material/Create';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from 'react-modal'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { updateDoc, doc } from "firebase/firestore";

const EditCommentModal = (props) => {
    const [updateText, updateEntered] = useState(false);
    const [newComment, setNewComment] = useState("");

    const updateComment = () => {
        updateDoc(doc(db, "comments", props.editCommentRef.key),{
            comment: newComment,
        })
        resetModalForm();
    }

    //  useEffect(() => {
    //     setNewComment(props.item.comment);
    //  }, [props.item]);

    useEffect(()=> {
        if(newComment != "")
            updateEntered(false);
        else
            updateEntered(true);
    }, [newComment]);

    const resetModalForm = () => {
        setNewComment("");
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
          backgroundColor: '#A0DDE6',
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
            Edit Post
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="standard-basic"
                    label="Comment"
                    name="email"
                    autoComplete=""
                    onChange={(event) => {
                        setNewComment(event.target.value)
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
            </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                    <Grid item justifyContent="flex-end" sx={{marginTop: 3}}>
                        <Button sx={{marginRight: 3}}>
                            <CancelIcon color="secondary" fontSize="large" onClick={props.closeModal} />
                        </Button>
                        <Button disabled={updateText} sx={{marginRight: 3}}>
                            <PostAddIcon color="success" fontSize="large" onClick={updateComment} />
                        </Button>
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
</Modal>);
}
export default EditCommentModal