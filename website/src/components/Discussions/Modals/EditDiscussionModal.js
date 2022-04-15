import React from "react";
import { useState, useEffect} from 'react';
import { IconButton } from '@material-ui/core';
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
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { updateDoc, doc } from "firebase/firestore";

const EditDiscussionModal = (props) => {
    const [updateText, updateEntered] = useState(false);
    const [discussionTitle, setNewDiscussionTitle] = useState("");
    const [postContent, setNewPostContent] = useState("");
    const [tags, setTags] = useState([]);

    const updateDiscussion = () => {
        updateDoc(doc(db, "discussions", props.editModalRef.key),{
            contentId: "",
            contentText: postContent,
            title: discussionTitle,
            updatedAt: Date().toLocaleString(),
            tags: {tags},
        })
        resetModalForm();
    }

     useEffect(() => {
         setNewDiscussionTitle(props.editModalRef.title);
         setNewPostContent(props.editModalRef.contentText);
     }, [props.editModalRef]);

    useEffect(()=> {
        if((discussionTitle != "") ||  (postContent != ""))
            updateEntered(false);
        else
            updateEntered(true);
    }, [discussionTitle, postContent]);

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
            Edit Post
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
                    <Grid item justifyContent="flex-end">
                        <IconButton size="medium" color="secondary" onClick={props.closeModal}>
                            <CancelIcon/>
                        </IconButton>
                        <IconButton disabled={updateText} size="medium" onClick={updateDiscussion}>
                            <PostAddIcon color="success"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
</Modal>);
}
export default EditDiscussionModal