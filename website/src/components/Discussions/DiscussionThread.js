import React from "react";
import { useState, useEffect} from 'react';
import { signOut } from "firebase/auth";
import {auth, db} from '../../firebase-config'
import { Fab } from '@material-ui/core';
import {Stack, Container} from '@mui/material'
import {collection, onSnapshot, query, where} from "firebase/firestore";
import CommentBox from './Comments/commentBox'
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import NewCommentModal from "./Comments/NewCommentModal";
import EditCommentModal from "./Comments/EditCommentModal";

const DiscussionThread = (props) => {
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [editCommentModalIsOpen, setEditCommentModal] = useState(false);
    const [editCommentRef, setEditCommentRef] = useState("None");
    
    useEffect(()=> {
        const q = query (collection(db, "comments"), where("discussionId", "==", props.activeDiscussion.key));
    
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
    }, [props.activeDiscussion]);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const openEditModal = (value) => {
        setEditCommentRef(value);
        setEditCommentModal(true);
    }

    const closeEditModal = () => {
        setEditCommentModal(false);
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
                <EditCommentModal editCommentRef={editCommentRef} modalIsOpen={editCommentModalIsOpen} closeModal={closeEditModal} activeComment={props.activeComment}/>
                <NewCommentModal  modalIsOpen={modalIsOpen} closeModal={closeModal} activeDiscussion={props.activeDiscussion}/>
                <div style = {{textAlign: "center"}}>
                    <button onClick={props.returnDiscussion({"discussionId":"None" })}>Back</button>
                    <button onClick={props.goToHome}>Home</button>
                    <button onClick={props.goToMessages}>DMs</button>
                    <button onClick={logout}>LogOut</button>
                </div>
                <Container>
                    <Box
                        sx={{
                            margin: 3,
                            padding: 4,
                            backgroundColor: 'primary.main',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >
                        <Typography>Title {props.activeDiscussion.title}</Typography>
                        <Typography>{props.activeDiscussion.commentCount} comments</Typography>
                        <Typography>Submitted by {props.activeDiscussion.creatorName} {props.activeDiscussion.createdAt} hours ago</Typography>
                    </Box>
                    <Stack direction="column" m={5} spacing ={2}>
                        {comments.map((item) => (
                            <CommentBox returnComment={props.returnComment} openModal={openEditModal} item={item} key={item.key} activeDiscussion={props.activeDiscussion} />
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

