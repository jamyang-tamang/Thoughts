import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, Button ,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import {auth, db} from '../../firebase-config'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';

const DiscussionPost = (props) => {

    // const launchDiscussion = value => () => {
    //     return <Discussion props={props}/>
    // }

    const deleteDiscussion = value => () => {
        console.log(value);
        deleteDoc(doc(db, "discussions", value)); 
    }

    const upVote = value => () => {
        updateDoc(doc(db, "discussions", value.id),{
            upVoteCount: value.upVoteCount + 1,
        })
    }

    const downVote = value => () => {
        updateDoc(doc(db, "discussions", value.id),{
            downVoteCount: value.downVoteCount + 1,
        })
    }

    const editDiscussion = value => () => { 
        updateDoc(doc(db, "discussions", value.id),{
            // commentCount: value.commentCount,
            contentText: value.postContentText,
            // downVoteCount: value.downVoteCount,
            title: value.title,
            updatedAt: Date().toLocaleString(),
            tags: value.tags,
        })
    }

    function DeleteButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={deleteDiscussion(props.id)}><DeleteIcon /></IconButton>;
        return null
    }

    function EditButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={editDiscussion(props) }><EditIcon /></IconButton>;
        return null
    }

    return (
        <Stack key={props.id} alignItems="flex-start" direction="row">
                <Stack direction="Row">
                    <Stack direction="Column">
                        <IconButton onClick={upVote(props)}><ThumbUpIcon /></IconButton>
                        <Box>{props.upVoteCount}</Box>
                    </Stack>
                    <Stack direction="Column">
                        <IconButton onClick={downVote(props)}><ThumbDownIcon /></IconButton>
                        <Box>{props.downVoteCount}</Box>
                    </Stack>
                </Stack>
            <Box
                sx={{
                    width: window.innerWidth,
                    padding: 4,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }} 
                onClick={props.toggleDiscussion}
                > 
                <Typography>{props.title} </Typography>
                <Typography>{props.commentCount} comments</Typography>
                <Typography>Submitted by {props.creatorName} </Typography>
            </Box>
            <Stack direction="Column">
                <DeleteButton id={props.id} />
                <EditButton id={props.id}/>
            </Stack>
        </Stack>
    )
    
}

export default DiscussionPost