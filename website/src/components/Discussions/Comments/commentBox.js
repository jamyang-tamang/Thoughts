import  {React} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import {auth, db} from '../../../firebase-config'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';

const Comment = (props) => {

    const deleteComment = value => () => {
        console.log(value);
        deleteDoc(doc(db, "comments", value)); 
    }

    const upVote = value => () => {
        updateDoc(doc(db, "comments", value.commentId),{
            upVoteCount: value.upVoteCount + 1,
        })
    }

    const downVote = value => () => {
        updateDoc(doc(db, "comments", value.commentId),{
            downVoteCount: value.downVoteCount + 1,
        })
    }

    const editDiscussion = value => () => { 
        updateDoc(doc(db, "comments", value.commentId),{
            // commentCount: value.commentCount,
            comment: value.comment,
            // downVoteCount: value.downVoteCount,
            title: value.title,
            updatedAt: Date().toLocaleString(),
            tags: value.tags,
        })
    }

    function DeleteButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={deleteComment(props.commentId)}><DeleteIcon /></IconButton>;
        return null
    }

    function EditButton (){
        if(auth.currentUser.email === props.creatorName)
            return <IconButton onClick={editDiscussion(props) }><EditIcon /></IconButton>;
        return null
    }

    return (
        <Stack key={props.commentId} alignItems="flex-start" direction="row">
                <Stack direction="row">
                    <Stack direction="column">
                        <IconButton onClick={upVote(props)}><ThumbUpIcon /></IconButton>
                        <Box>{props.upVoteCount}</Box>
                    </Stack>
                    <Stack direction="column">
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
                > 
                <Typography>{props.discussionId} {props.comment}</Typography>
                <Typography>{props.commentCount} comments</Typography>
                <Typography>Submitted by {props.creatorName} </Typography>
            </Box>
            <Stack direction="column">
                <DeleteButton id={props.id} />
                <EditButton id={props.id}/>
            </Stack>
        </Stack>
    )
    
}

export default Comment