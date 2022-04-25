import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, addDoc, deleteDoc, doc, query, collection, where, onSnapshot} from "firebase/firestore";
import {auth, db} from '../../../firebase-config'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Comment = (props) => {
    const [interaction, updateInteraction] = useState("nonExistant");

    useEffect(()=>{
        const q = query (collection(db, "interactions"), where("postId", "==", props.item.key), where("userId", "==", auth.currentUser.uid));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                updateInteraction({...doc.data(), key: doc.id});
            })
        },
        (error) => {
            console.log(error.message)
        })
    }, [props.value])
    
    const deleteComment = value => () => {
        deleteDoc(doc(db, "comments", value.item.key)); 
        updateDoc(doc(db, "discussions", props.activeDiscussion.key),{
            commentCount: props.activeDiscussion.commentCount - 1,
        });
    }

    function Votes(){
        if(interaction.upVote){
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton disabled={true} onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{alignContent:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else if(interaction.downVote){
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{alignContent:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton disabled={true} onClick={downVote(props)} ><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else{
            return(<Stack direction="row">
                        <Stack direction="column">
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon style={{ fontSize: 40 }} /></IconButton>
                            <Box style={{alignContent:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
    }

    const upVote = value => () => {
        if(interaction == "nonExistant"){
            addDoc(collection(db, 'interactions'), {
                postId: value.item.key,
                upVote: true,
                downVote: false,
                userId: auth.currentUser.uid,
            })
            .then(
                updateDoc(doc(db, "comments", value.item.key),{
                    upVoteCount: value.item.upVoteCount + 1,
                })
            )
        }
        else if(interaction.downVote){
            updateDoc(doc(db, "interactions", interaction.key),{
                downVote: false,
            })
            updateDoc(doc(db, "comments", value.item.key),{
                downVoteCount: value.item.downVoteCount - 1 ,
            })
        }
        
        else if(interaction != "nonExistant"){
            updateDoc(doc(db, "interactions", interaction.key),{
                upVote: true,
            })
            updateDoc(doc(db, "comments", value.item.key),{
                upVoteCount: value.item.upVoteCount + 1,
            })
        }
    }


    const downVote = value => () => {
        if(interaction == "nonExistant"){
            addDoc(collection(db, 'interactions'), {
                postId: value.item.key,
                upVote: false,
                downVote: true,
                userId: auth.currentUser.uid,
            }).then(
                updateDoc(doc(db, "comments", value.item.key),{
                    downVoteCount: value.item.downVoteCount + 1,
                })
            )
        }
        else if(interaction.upVote){
            updateDoc(doc(db, "interactions", interaction.key),{
                upVote: false,
            })
            updateDoc(doc(db, "comments", value.item.key),{
                upVoteCount: value.item.upVoteCount - 1 ,
            })
        }
        
        else if(interaction != "nonExistant"){
            updateDoc(doc(db, "interactions", interaction.key),{
                downVote: true,
            })
            updateDoc(doc(db, "comments", value.item.key),{
                downVoteCount: value.item.downVoteCount + 1,
            })
        }
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

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
              main: '#79ae92',
            },
            secondary: {
              main: '#ffffff',
            },
        },
      });
      
    return (
        <ThemeProvider theme={theme}>
            <Stack key={props.item.commentId} alignItems="flex-start" direction="row">
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
        </ThemeProvider>
    )
    
}

export default Comment