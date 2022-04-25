import React from "react";
import { useState, useEffect} from 'react';
import {auth} from '../../../firebase-config'
import { Button } from '@material-ui/core';
import {Container} from '@mui/material'
import { db } from "../../../firebase-config";
import {collection, addDoc} from "firebase/firestore";
import CreateIcon from '@mui/icons-material/Create';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from 'react-modal'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const NewDiscussionModal = (props) => {
    const [titlePresent, toggleTitlePresent] = useState(false);
    const [discussionTitle, setNewDiscussionTitle] = useState("");
    const [postContent, setNewPostContent] = useState("");
    const [tags, setTags] = useState([]);
    // const [contentLink, setNewContentLink] = useState("");

    const colRef = collection(db, 'discussions');
    
    const postNewDisccusion = () => {
        addDoc(colRef, {
            commentCount: 0,
            contentId: "",
            createdAt: Date().toLocaleString(),
            creatorId: auth.currentUser.uid,
            creatorName: auth.currentUser.email,
            contentText: postContent,
            downVoteCount: 0,
            title: discussionTitle,
            upVoteCount: 0,
            updatedAt: Date().toLocaleString(),
            tags: {tags},
        })
        .then(() => {
            resetModalForm()
        })
    }


    useEffect(()=> {
        if(discussionTitle !== "")
            toggleTitlePresent(true);
        toggleTitlePresent(false);
    }, [discussionTitle]);

    const resetModalForm = () => {
        setNewDiscussionTitle("");
        setNewPostContent("");
        setTags([]);
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
            Create a New Post
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="standard-basic"
                    label="Title"
                    name="email"
                    autoComplete=""
                    onChange={(event) => {
                        setNewDiscussionTitle(event.target.value)
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    multiline
                    id="post"
                    label="Post"
                    name="post"
                    onChange={(event) => {
                        setNewPostContent(event.target.value)
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={tags.map((option) => option.title)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Tags"
                        placeholder="Enter a tag for this post"
                    />
                    )}
                />
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item justifyContent="flex-end" sx={{marginTop: 3}}>
                    <Button sx={{marginRight: 3}}>
                        <CancelIcon color="secondary" fontSize="large" onClick={props.closeModal} />
                    </Button>
                    <Button  disabled={titlePresent} sx={{marginRight: 3}}>
                        <PostAddIcon color="success" fontSize="large" onClick={postNewDisccusion} />
                    </Button>
                    
                </Grid>
            </Grid>

            </Box>
        </Box>
    </Container>
</Modal>);
}
export default NewDiscussionModal