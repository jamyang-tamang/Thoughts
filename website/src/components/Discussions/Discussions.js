import React from "react";
import { useState, useEffect} from 'react';
import { signOut } from "firebase/auth";
import {auth} from '../../firebase-config'
import { Fab, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {Stack, Container} from '@mui/material'
import { db } from "../../firebase-config";
import {collection, onSnapshot, addDoc} from "firebase/firestore";
import DiscussionPost from './DiscussionPost'
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

const Discussions = (props) => {
    const [discussions, setDiscussions] = useState([]);
    const [tags, setTags] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [discussionTitle, setNewDiscussionTitle] = useState("");
    const [postContent, setNewPostContent] = useState("");
    // const [contentLink, setNewContentLink] = useState("");
    const [titlePresent, toggleTitlePresent] = useState(false);
    const colRef = collection(db, 'discussions');
    
    useEffect(()=> {
        onSnapshot(collection(db, 'discussions'),
            (snapshot) => {
                let discussions = []
                snapshot.forEach((doc) => {
                discussions.push({ ...doc.data(), key: doc.id })
                })
                setDiscussions(discussions);
            },
            (error) => {
                console.log(error.message)
            }
        )
    }, []);

    useEffect(()=> {
        if(discussionTitle != "")
            toggleTitlePresent(true);
        toggleTitlePresent(false);
    }, []);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }
    
    const resetModalForm = () => {
        setNewDiscussionTitle("");
        setNewPostContent("");
        setTags([]);
        closeModal();
    }

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

    const logout = async () => {
        await signOut(auth);
        props.goToLogin();
    };

    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
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
                        <Grid item justifyContent="flex-end">
                            <IconButton size="large" color="secondary" onClick={closeModal}>
                                <CancelIcon/>
                            </IconButton>
                            <IconButton disabled={titlePresent} size="large" onClick={postNewDisccusion}>
                                <PostAddIcon color="success"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
            </Modal>
            
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToHome}>Home</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={logout}>LogOut</button>
            </div>
            <Container>
                <Stack direction="column" m={5} spacing ={2}>
                    {discussions.map((item) => (
                        <DiscussionPost id={item.key} title={item.title} upVoteCount={item.upVoteCount} downVoteCount={item.downVoteCount} 
                        commentCount={item.commentCount} contentText={item.contentText} creatorName={item.creatorName} toggleDiscussion={props.toggleDiscussion}/>
                    ))}
                </Stack>
                <Fab onClick={openModal} style={fabStyle} size="large" color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Container>
        </div>
    )
}

export default Discussions;

