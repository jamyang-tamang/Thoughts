import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, addDoc, deleteDoc, doc, query, collection, where, onSnapshot} from "firebase/firestore";
import {auth, db} from '../../../firebase-config'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';

const DiscussionPost = (props) => {
    const [interaction, updateInteraction] = useState("nonExistant");

    useEffect(()=> {
        const q = query (collection(db, "interactions"), where("postId", "==", props.item.key), where("userId", "==", auth.currentUser.uid));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                updateInteraction({...doc.data(), key: doc.id});
            })
        },
        (error) => {
            console.log(error.message)
        })
    }, [props]);

    const deleteDiscussion = value => () => {
        const q = query(collection(db, "comments"), where("discussionId", "==", value.item.key));
        const comments = [];
        onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((item) => {
                deleteDoc(doc(db, "comments", item.id));
            },
            deleteDoc(doc(db, "discussions", value.item.key)),
            )
        })
    }

    function Votes(){
        if(interaction.upVote){
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton disabled={true} onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else if(interaction.downVote){
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton disabled={true} onClick={downVote(props)} ><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else{
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
    }

    const upVote = value => () => {
        if(interaction === "nonExistant"){
            addDoc(collection(db, 'interactions'), {
                postId: value.item.key,
                upVote: true,
                downVote: false,
                userId: auth.currentUser.uid,
            })
            .then(
                updateDoc(doc(db, "discussions", value.item.key),{
                    upVoteCount: value.item.upVoteCount + 1,
                })
            )
        }
        else if(interaction.downVote){
            updateDoc(doc(db, "interactions", interaction.key),{
                downVote: false,
            })
            updateDoc(doc(db, "discussions", value.item.key),{
                downVoteCount: value.item.downVoteCount - 1 ,
            })
        }
        else if(interaction !== "nonExistant"){
            updateDoc(doc(db, "interactions", interaction.key),{
                upVote: true,
            })

            updateDoc(doc(db, "discussions", value.item.key),{
                upVoteCount: value.item.upVoteCount + 1,
            })
        }
    }


    const downVote = value => () => {
        if(interaction === "nonExistant"){
            addDoc(collection(db, 'interactions'), {
                postId: value.item.key,
                upVote: false,
                downVote: true,
                userId: auth.currentUser.uid,
            })
            .then(
                updateDoc(doc(db, "discussions", value.item.key),{
                    upVoteCount: value.item.downVoteCount + 1,
                })
            )
        }
        else if(interaction.upVote){
            updateDoc(doc(db, "interactions", interaction.key),{
                upVote: false,
            })
            updateDoc(doc(db, "discussions", value.item.key),{
                upVoteCount: value.item.upVoteCount - 1 ,
            })
        }
        else if(interaction !== "nonExistant"){
            updateDoc(doc(db, "interactions", interaction.key),{
                downVote: true,
            })
            updateDoc(doc(db, "discussions", value.item.key),{
                downVoteCount: value.item.downVoteCount + 1,
            })
        }
    }

    function DeleteEditOptions(){
        if(auth.currentUser.email === props.item.creatorName)
            return(<Stack direction="column" spacing={5}>
                        <IconButton onClick={deleteDiscussion(props)}><DeleteIcon style={{fontSize: 30}} /></IconButton>
                        <IconButton onClick={editDiscussion(props)}><EditIcon style={{fontSize: 30}} /></IconButton>
                    </Stack>)
        
        return null;
        
    }

    const editDiscussion = value => () => { 
        props.openEditModal(value.item);
    }

    return (
        <div>
            <Stack key={props.item.key} alignItems="flex-start" direction="row">
                    <Votes props={props}/>
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
                <DeleteEditOptions/>
            </Stack>
        </div>
    )
    
}

export default DiscussionPost