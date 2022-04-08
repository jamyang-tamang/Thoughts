import React from "react";
import { useState, useEffect} from 'react';
import { signOut } from "firebase/auth";
import {auth} from '../../firebase-config'
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {Stack, Container} from '@mui/material'
import { db } from "../../firebase-config";
import {collection, onSnapshot} from "firebase/firestore";
import DiscussionPost from './DiscussionPost'

import NewDiscussionModal from './NewDiscussionModal';
import EditDiscussionModal from "./EditDiscussionModal";

const AllDiscussions = (props) => {
    const [discussions, setDiscussions] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [editModalIsOpen, setEditModal] = useState(false);
    const [editModalRef, setEditModalRef] = useState("None");

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
    
    function openEditModal(value){
        setEditModalRef(value);
        setEditModal(true);
    }

    const closeEditModal = () => {
        setEditModal(false);
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
            <EditDiscussionModal editModalRef={editModalRef} title={editModalRef.title} modalIsOpen={editModalIsOpen} closeModal={closeEditModal}/>
            <NewDiscussionModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToHome}>Home</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={logout}>LogOut</button>
            </div>
            <Container>
                <Stack direction="column" m={5} spacing ={2}>
                    {discussions.map((item) => (
                        <DiscussionPost key={item.key} openEditModal={openEditModal} discussionId={item.key} title={item.title} upVoteCount={item.upVoteCount} downVoteCount={item.downVoteCount} 
                        commentCount={item.commentCount} contentText={item.contentText} creatorName={item.creatorName} returnDiscussion={props.returnDiscussion} setDiscussionId={props.setDiscussionId}/>
                    ))}
                </Stack>
                <Fab onClick={openModal} style={fabStyle} size="large" color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Container>
        </div>
    )
}

export default AllDiscussions;

