import  {React, useDebugValue} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, deleteDoc, doc} from "firebase/firestore";
import {auth, db} from '../../firebase-config'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';

const DiscussionPost = (props) => {

    const deleteDiscussion = value => () => {
        console.log(value);
        deleteDoc(doc(db, "discussions", value)); 
    }

    const upVote = value => () => {
        updateDoc(doc(db, "discussions", value.discussionId),{
            upVoteCount: value.upVoteCount + 1,
        })
    }

    const downVote = value => () => {
        updateDoc(doc(db, "discussions", value.discussionId),{
            downVoteCount: value.downVoteCount + 1,
        })
    }

    const editComment = value => () => { 
        props.openEditModal(value);
    }

    function DeleteButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={deleteDiscussion(props.discussionId)}><DeleteIcon style={{fontSize: 30}} /></IconButton>;
        return null
    }

    function EditButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={editComment(props) }><EditIcon style={{fontSize: 30}} /></IconButton>;
        return null
    }



    return (
        <div>
            <Stack key={props.discussionId} alignItems="flex-start" direction="row">
                    <Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{alignContent:"center"}}>{props.upVoteCount - props.downVoteCount}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
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
                    onClick={props.returnDiscussion(props)}
                    > 
                    <Typography>{props.title} </Typography>
                    <Typography>{props.commentCount} comments</Typography>
                    <Typography>Submitted by {props.creatorName} </Typography>
                    <Typography>Created at {props.createdAt} </Typography>
                </Box>
                <Stack direction="column" spacing={5}>
                    <DeleteButton id={props.discussionId} />
                    <EditButton id={props}/>
                </Stack>
            </Stack>
        </div>
    )
    
}

export default DiscussionPost