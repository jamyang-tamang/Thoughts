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

import NewDiscussionModal from './NewDiscussionModal';

const Discussions = (props) => {
    const [discussions, setDiscussions] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    
    // const [contentLink, setNewContentLink] = useState("");
    
    
    
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
            <NewDiscussionModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>

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

