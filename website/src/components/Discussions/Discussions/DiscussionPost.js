import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, addDoc, deleteDoc, doc, query, collection, where, onSnapshot} from "firebase/firestore";
import {auth, db} from '../../../firebase-config'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DiscussionPost = (props) => {
    const [interaction, updateInteraction] = useState("nonExistant");

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
              main: '#7a9295',
            //   main: '#639a60',
            },
            secondary: {
              main: '#ffffff',
            },
        },
      });

      
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
                        <Stack direction="column" paddingRight={2.5} paddingTop={0.5}>
                            <IconButton disabled={true} onClick={upVote(props)}><ArrowUpwardIcon sx={{color:"#39FF14"}} style={{ fontSize: 40 }} /></IconButton>
                            <Box sx={{color:"#39FF14"}} style={{ paddingBottom:2.5, textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton onClick={downVote(props)}><ArrowDownwardIcon style={{ fontSize: 40 }} sx={{color:"#808080", '&:hover': {color: 'red',}}} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else if(interaction.downVote){
            return(<Stack direction="row">
                        <Stack direction="column" paddingRight={2.5} paddingTop={0.5}>
                            <IconButton onClick={upVote(props)}><ArrowUpwardIcon sx={{color:"#808080", '&:hover': {color: '#39FF14'}, '&:hover': {color: '#808080',}}} style={{ fontSize: 40 }} /></IconButton>
                            <Box sx={{color:"red"}} style={{textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton disabled={true} onClick={downVote(props)} ><ArrowDownwardIcon sx={{color:"red"}} style={{ fontSize: 40 }} /></IconButton>
                        </Stack>
                    </Stack>);
        }
        else{
            return(<Stack direction="row">
                        <Stack direction="column" paddingRight={2.5} paddingTop={0.5} >
                            <IconButton color="secondary" onClick={upVote(props)}><ArrowUpwardIcon sx={{color:"#808080", '&:hover': {color: '#39FF14',}}} style={{ fontSize: 40 }} /></IconButton>
                            <Box sx={{color:"#808080"}} style={{textAlign:"center"}}>{parseInt(props.item.upVoteCount) - parseInt(props.item.downVoteCount)}</Box>
                            <IconButton color="secondary" onClick={downVote(props)}><ArrowDownwardIcon sx={{color:"#808080", '&:hover': {color: 'red',}}} style={{ fontSize: 40 }} /></IconButton>
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
            return(<Stack direction="column" paddingLeft={2.5} paddingTop={0.5} spacing={5}>
                        <IconButton onClick={deleteDiscussion(props)}><DeleteIcon sx={{ '&:hover': {color: 'red',}}} style={{fontSize: 30}} /></IconButton>
                        <IconButton onClick={editDiscussion(props)}><EditIcon sx={{ '&:hover': {color: 'green',}}} style={{fontSize: 30}} /></IconButton>
                    </Stack>)
        
        return null;
        
    }

    const editDiscussion = value => () => { 
        props.openEditModal(value.item);
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack key={props.item.key} alignItems="flex-start" direction="row">
                    <Votes props={props}/>
                <Box
                    sx={{
                        width: window.innerWidth,
                        padding: 2.5,
                        boxShadow: 3,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }} 
                    onClick={props.returnDiscussion(props.item)}
                    > 
                    <Typography variant="h3" color="common.white">{props.item.title} </Typography>
                    <Typography variant="h5" color="common.white">Submitted on {props.item.createdAt} by {props.item.creatorName} </Typography>
                    <Typography variant="h6" color="common.white">{props.item.commentCount} comments</Typography>
                </Box>
                <DeleteEditOptions/>
            </Stack>
        </ThemeProvider>
    //     <ThemeProvider theme={theme}>
    //     <Stack key={props.item.key} alignItems="flex-start" direction="row">
    //             <Votes props={props}/>
    //         <Box
    //             sx={{
    //                 width: window.innerWidth,
    //                 padding: 2.5,
    //                 boxShadow: 3,
    //                 backgroundColor: 'white',
    //                 opacity: 0.5,
    //                 '&:hover': {
    //                 backgroundColor: 'primary.main',
    //                 opacity: [0.9, 0.8, 0.7],
    //                 },
    //             }} 
    //             onClick={props.returnDiscussion(props.item)}
    //             > 
    //             <Typography variant="h3" sx={{opacity:1}} color="#010203">{props.item.title} </Typography>
    //             <Typography variant="h5" sx={{opacity:1}} color="#000000">Submitted on {props.item.createdAt} by {props.item.creatorName} </Typography>
    //             <Typography variant="h6" sx={{opacity:1}} color="#000000">{props.item.commentCount} comments</Typography>
    //         </Box>
    //         <DeleteEditOptions/>
    //     </Stack>
    // </ThemeProvider>
    )
    
}

export default DiscussionPost