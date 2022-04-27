import React from "react";
import { useState, useEffect} from 'react';
import {auth, db} from '../../../firebase-config'
import { Button } from '@material-ui/core';
import {Container} from '@mui/material'
import {collection, addDoc, updateDoc, doc} from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from 'react-modal'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";


const NewCommentModal = (props) => {
    const [newComment, setNewComment] = useState("");
    const [commentPresent, toggleCommentPresent] = useState(false);
    const colRef = collection(db, 'comments');

    const postNewComment = () => {
        updateDoc(doc(db, "discussions", props.activeDiscussion.key),{
            commentCount: props.activeDiscussion.commentCount + 1,
        })
        addDoc(colRef, {
            createdAt: Date().toLocaleString(),
            creatorId: auth.currentUser.uid,
            creatorName: auth.currentUser.email,
            downVoteCount: 0,
            comment: newComment,
            upVoteCount: 0,
            updatedAt: Date().toLocaleString(),
            discussionId: props.activeDiscussion.key,
        })
        resetModalForm()
    }

    useEffect(()=> {
        if(newComment !== "")
            toggleCommentPresent(true);
        toggleCommentPresent(false);
    }, [newComment]);

    const resetModalForm = () => {
        setNewComment("");
        props.closeModal();
    }

    const customStyles = {
        content: {
          top: '50%',
          backgroundColor: '#C8A2C8',
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
            <CommentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Add a Comment
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                fullWidth
                multiline
                id="post"
                label="Post"
                name="post"
                onChange={(event) => {
                    setNewComment(event.target.value)
                }}
        />
        </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
            <Grid item justifyContent="flex-end" sx={{marginTop: 3}}>
                <Button sx={{marginRight: 3}}>
                    <CancelIcon color="secondary" fontSize="large" onClick={props.closeModal} />
                </Button>
                <Button  disabled={commentPresent} sx={{marginRight: 3}}>
                    <SendIcon color="success" fontSize="large" onClick={postNewComment} />
                </Button>
                
            </Grid>
        </Grid>
    </Box>
    </Box>
</Container>
</Modal>)

}
export default NewCommentModal


