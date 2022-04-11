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
        deleteDoc(doc(db, "discussions", value.item.key)); 
    }

    const upVote = value => () => {
        updateDoc(doc(db, "discussions", value.item.key),{
            upVoteCount: value.item.upVoteCount + 1,
        })
    }

    const downVote = value => () => {
        updateDoc(doc(db, "discussions", value.item.key),{
            downVoteCount: value.item.downVoteCount + 1,
        })
    }

    const editDiscussion = value => () => { 
        props.openEditModal(value.item);
    }

    function DeleteButton (){
        if(auth.currentUser.email === props.item.creatorName)
            return <IconButton onClick={deleteDiscussion(props)}><DeleteIcon style={{fontSize: 30}} /></IconButton>;
        return null
    }

    function EditButton (){
        if(auth.currentUser.email === props.item.creatorName)
            return <IconButton onClick={editDiscussion(props)}><EditIcon style={{fontSize: 30}} /></IconButton>;
        return null
    }



    return (
        <div>
            <Stack key={props.item.key} alignItems="flex-start" direction="row">
                    <Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{alignContent:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
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
                    onClick={props.returnDiscussion(props.item)}
                    > 
                    <Typography>{props.item.title} </Typography>
                    <Typography>{props.item.commentCount} comments</Typography>
                    <Typography>Submitted by {props.item.creatorName} </Typography>
                    <Typography>Created at {props.item.createdAt} </Typography>
                </Box>
                <Stack direction="column" spacing={5}>
                    <DeleteButton item={props.item} />
                    <EditButton item={props}/>
                </Stack>
            </Stack>
        </div>
    )
    
}

export default DiscussionPost