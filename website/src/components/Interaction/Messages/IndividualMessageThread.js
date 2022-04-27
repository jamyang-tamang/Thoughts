import {React, useEffect, useState} from "react";
import {db} from '../../../firebase-config'
import {Stack, Container, Typography, Box} from '@mui/material'
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import MessageBox from "./MessageBox";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import GestureIcon from '@mui/icons-material/Gesture';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

const IndividualMessageThread = (props) => {
    const [messages, setMessages] = useState([]);
    const [newTextMessage, setNewTextMessage] = useState([]);

    useEffect(()=> {
        console.log("Key: " + props.activeMessageThread.key);
        const q = query (collection(db, "messages"), where("threadId", "==", props.activeMessageThread.key));
        onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), key: doc.id});
            })
            setMessages(messages.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)));
        },
        (error) => {
            console.log(error.message)
        })
    }, [props]);

    const createNewMessage = (value) => () => {
        addDoc(collection(db, 'messages'), {
            text: newTextMessage,
            threadId: value.activeMessageThread.key,
            senderId: sessionStorage.getItem('user'),
            createdAt: Date().toLocaleString(),
        })
    }

    const fabStyle = {
        backgroundColor: "white",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "15px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    };

    return(
    <div>
        <div style = {{backgroundColor: "#0B816f" ,textAlign: "right"}}>
        <Typography marginRight="auto" display="inline" textAlign="left" variant="h6">{props.activeMessageThread.participants.filter(name => !name.includes(sessionStorage.getItem('user')))}</Typography>
            <Button onClick={props.returnMessageThread({"key":"None" })}><ReplyIcon fontSize="large" /></Button>
            <Button onClick={props.goToDiscussions}><WorkspacesIcon fontSize="large"/></Button>
            <Button onClick={props.goToHome}><GestureIcon fontSize="large" /></Button>
            <Button onClick={props.logout}><LogoutIcon fontSize="large" /></Button>
        </div>
        
        <Stack direction="column" m={5} spacing ={2}>
                {/* <NewMessageModal modalIsOpen={newMessageModalState} closeModal={closeNewMessageModal}/> */}
                <Container>
                    {messages.map((message) => (
                                <MessageBox returnMessageThread={props.returnMessageThread} key={message.key} thread={message} />
                            ))}
                </Container>
                <Stack direction="row" style={fabStyle} spacing ={3}>
                        <TextField id="outlined-search" label="Message" type="search" onChange={(event) => {
                        setNewTextMessage(event.target.value)
                    }} fullWidth/>
                        <Button size="medium" onClick={createNewMessage(props)}><SendIcon/></Button>
                </Stack>
        </Stack>
    </div>
    )
}

export default IndividualMessageThread;
