import  {React} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import {auth, db} from '../../../firebase-config'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';

const Comment = (props) => {

    const deleteComment = value => () => {
        deleteDoc(doc(db, "comments", value.item.key)); 
        updateDoc(doc(db, "discussions", props.activeDiscussion.key),{
            commentCount: props.activeDiscussion.commentCount - 1,
        });
    }

    const upVote = value => () => {
        updateDoc(doc(db, "comments", value.key),{
            upVoteCount: value.upVoteCount + 1,
        })
    }

    const downVote = value => () => {
        updateDoc(doc(db, "comments", value.key),{
            downVoteCount: value.downVoteCount + 1,
        })
    }

    const editComment = value => () => { 
        props.openModal(value.item);
    }

    function DeleteButton (){
        if(auth.currentUser.email === props.item.creatorName)
            return <IconButton onClick={deleteComment(props)}><DeleteIcon /></IconButton>;
        return null
    }

    function EditButton (){
        if(auth.currentUser.email === props.item.creatorName)
            return <IconButton onClick={editComment(props)}><EditIcon /></IconButton>;
        return null
    }

    return (
        <Stack key={props.item.commentId} alignItems="flex-start" direction="row">
                <Stack direction="row">
                    <Stack direction="column">
                        <IconButton onClick={upVote(props.item)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                        <Box style={{alignContent:"center"}}>{props.item.upVoteCount - props.item.downVoteCount}</Box>
                        <IconButton onClick={downVote(props.item)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
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
                onClick={props.returnComment(props.item)}
                > 
                <Typography>{props.item.comment}</Typography>
                {/* <Typography>{props.item.commentCount} comments</Typography> */}
                <Typography>Submitted by {props.item.creatorName} at {props.item.createdAt} </Typography>
            </Box>
            <Stack direction="column">
                <DeleteButton id={props} />
                <EditButton id={props}/>
            </Stack>
        </Stack>
    )
    
}

export default Comment