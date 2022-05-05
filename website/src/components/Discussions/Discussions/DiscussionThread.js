import React from "react";
import { useState, useEffect} from 'react';
import { db} from '../../../firebase-config'
import { Fab, Button } from '@material-ui/core';
import {Stack, Container} from '@mui/material'
import {collection, onSnapshot, query, where} from "firebase/firestore";
import CommentBox from '../Comments/commentBox'
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import NewCommentModal from "../Comments/NewCommentModal";
import EditCommentModal from "../Comments/EditCommentModal";
import ReplyIcon from '@mui/icons-material/Reply';
import GestureIcon from '@mui/icons-material/Gesture';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';

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
            setComments(comments.sort((a,b) => ((a.upVoteCount-a.downVoteCount) < (b.upVoteCount-b.downVoteCount)) ? 1 : ((b.upVoteCount-b.downVoteCount) < (a.upVoteCount-a.downVoteCount) ? -1 : 0)));
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
                <div style = {{backgroundColor: "#0B816f", textAlign: "right"}}>
                    <Button onClick={props.returnDiscussion({"discussionId":"None" })}><ReplyIcon fontSize="large" /></Button>
                    <Button onClick={props.goToHome}><GestureIcon fontSize="large" /></Button>
                    <Button onClick={props.goToInteractions}><MailIcon fontSize="large" /></Button>
                    <Button onClick={props.logout}><LogoutIcon fontSize="large" /></Button>
                </div>
                <Container>
                    <Box
                        sx={{
                            margin: 3,
                            padding: 4,
                            boxShadow: 7,
                            color: '#ffffff',
                            backgroundColor: '#7a9295',
                            '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >

                        <Typography variant="h3" color="common.white">{props.activeDiscussion.title} </Typography>
                        <Typography variant="h4" color="common.white">{props.activeDiscussion.contentText} </Typography>
                        <Typography variant="h5" color="common.white">Submitted on {props.activeDiscussion.createdAt} by {props.activeDiscussion.creatorName} </Typography>
                        <Typography variant="h6" color="common.white">{props.activeDiscussion.commentCount} comments</Typography>
                    </Box>
                    <Stack direction="column" m={5} spacing ={2}>
                        {comments.map((item) => (
                            <CommentBox openModal={openEditModal} item={item} key={item.key} activeDiscussion={props.activeDiscussion} />
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

