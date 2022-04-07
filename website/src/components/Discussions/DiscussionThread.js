import React from "react";
import { useState, useEffect} from 'react';
import { signOut } from "firebase/auth";
import {auth, db} from '../../firebase-config'
import { Fab, IconButton } from '@material-ui/core';
import {Stack, Container} from '@mui/material'
import {collection, updateDoc, doc, onSnapshot, addDoc, query, where} from "firebase/firestore";
import CommentBox from './Comments/commentBox'
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
import NewCommentModal from "./Comments/NewCommentModal"


const DiscussionThread = (props) => {
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    
    const colRef = collection(db, 'comments');
    
    useEffect(()=> {
        const q = query (collection(db, "comments"), where("discussionId", "==", "ads"));
    
        onSnapshot(q, (querySnapshot) => {
            const comments = [];
            querySnapshot.forEach((doc) => {
                comments.push({...doc.data(), key: doc.id});
            })
            setComments(comments);
        },
        (error) => {
            console.log(error.message)
        })
    }, []);

    

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
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

    return(
        <div>
            <NewCommentModal  modalIsOpen={modalIsOpen} closeModal={closeModal} discussionId={props.key}/>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToHome}>Home</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={logout}>LogOut</button>
            </div>
            <Container>
                <Box
                    sx={{
                        width: window.innerWidth,
                        margin: 3,
                        padding: 4,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    > 
                    <Typography>{props.title}</Typography>
                    <Typography>{props.commentCount} comments</Typography>
                    <Typography>Submitted by {props.creatorName} {props.createdAt} hours ago</Typography>
                </Box>
                <Stack direction="column" m={5} spacing ={2}>
                    {comments.map((item) => (
                        <CommentBox id={item.key} title={item.title} upVoteCount={item.upVoteCount} downVoteCount={item.downVoteCount} 
                        commentCount={item.commentCount} contentText={item.contentText} creatorName={item.creatorName}/>
                    ))}
                </Stack>
                <Fab onClick={openModal} style={fabStyle} size="large" color="primary" aria-label="add">
                    <CommentIcon />
                </Fab>
            </Container>
        </div>
    )
}

export default DiscussionThread;

