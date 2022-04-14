import {React, useEffect, useState} from "react";
import {db} from '../../../firebase-config'
import {Stack, Container} from '@mui/material'
import { addDoc, collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import MessageBox from "./MessageBox";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const IndividualMessageThread = (props) => {
    const [messages, setMessages] = useState([]);
    const [newTextMessage, setNewTextMessage] = useState([]);

    useEffect(()=> {
        console.log("Key: " + props.activeMessageThread.key);
        const q = query (collection(db, "messages"), where("threadId", "==", props.activeMessageThread.key), orderBy("createdAt"));
        onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), key: doc.id});
            })
            setMessages(messages);
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
        <div style = {{textAlign: "center"}}>
            <button onClick={props.returnMessageThread({"key":"None"})}>Back</button>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToHome}>Home</button>
            <button onClick={props.logout}>LogOut</button>
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
                        <IconButton size="medium" onClick={createNewMessage(props)}><SendIcon/></IconButton>
                </Stack>
        </Stack>
    </div>
    )
}

export default IndividualMessageThread;
