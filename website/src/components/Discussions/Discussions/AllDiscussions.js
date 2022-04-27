import React from "react";
import { useState, useEffect} from 'react';
import { Fab, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {Stack, Container} from '@mui/material'
import { db } from "../../../firebase-config";
import {collection, onSnapshot} from "firebase/firestore";
import DiscussionPost from './DiscussionPost'
import Navbar from '../Navbar'

import NewDiscussionModal from '../Modals/NewDiscussionModal';
import EditDiscussionModal from "../Modals/EditDiscussionModal";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';


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
                setDiscussions(discussions.sort((a,b) => ((a.upVoteCount-a.downVoteCount) < (b.upVoteCount-b.downVoteCount)) ? 1 : ((b.upVoteCount-b.downVoteCount) < (a.upVoteCount-a.downVoteCount) ? -1 : 0)));
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

    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        backgroundColor: '#A0DDE6',
        // '&:hover': {
        //     backgroundColor: '#30C5FF'
        // },
    };

    return(
        <div>
            <EditDiscussionModal editModalRef={editModalRef} modalIsOpen={editModalIsOpen} closeModal={closeEditModal}/>
            <NewDiscussionModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            <Navbar props={props}/>
            <Container>
                <Stack direction="column" m={5} spacing ={2}>
                    {discussions.map((item) => (
                        <DiscussionPost key={item.key} item={item} openEditModal={openEditModal} returnDiscussion={props.returnDiscussion}/>
                    ))}
                </Stack>
                <Fab onClick={openModal} style={fabStyle} size="large" aria-label="add">
                    <Add />
                </Fab>
            </Container>
        </div>
    )
}

export default AllDiscussions;

