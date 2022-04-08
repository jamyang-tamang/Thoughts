import {React, useEffect, useState} from "react";
import { signOut } from "firebase/auth";
import {auth, db} from '../../firebase-config'
import {Stack, Container} from '@mui/material'
import IndividualMessages from "./IndividualMessages";
import IndividualRooms from "./IndividualRooms";
import { onSnapshot, collection } from "firebase/firestore";
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import NewMessageModal from "./Modals/NewMessageModal";
import TextField from '@mui/material/TextField';

const Messages = (props) => {
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newMessageModalState, setNewMessageModalState] = useState(false);

    useEffect(()=> {
        onSnapshot(collection(db, 'messages'),
            (snapshot) => {
                let messages = []
                snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), key: doc.id })
                })
                setMessages(messages);
                console.log(messages);
            },
            (error) => {
                console.log(error.message)
            }
        )
    }, []);

    useEffect(()=> {
        onSnapshot(collection(db, 'rooms'),
            (snapshot) => {
                let rooms = []
                snapshot.forEach((doc) => {
                    rooms.push({ ...doc.data(), key: doc.id })
                })
                setRooms(rooms);
                console.log(rooms);
            },
            (error) => {
                console.log(error.message)
            }
        )
    }, []);

    function openNewMessageModal(){
        setNewMessageModalState(true);
    }

    function openNewRoomModal(){
        console.log();
    }

    const closeNewMessageModal = () => {
        setNewMessageModalState(false);
    }

    const logout = async () => {
        await signOut(auth);
        props.goToLogin();
    };

    const messagesFabStyle = {
        margin: 0,
        top: 'auto',
        left: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    const roomsFabStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    return(
    <div>
        <div style = {{textAlign: "center"}}>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToHome}>Home</button>
            <button onClick={logout}>LogOut</button>
        </div>
        
        <TextField id="outlined-search" label="Search field" type="search" />
        <NewMessageModal modalIsOpen={newMessageModalState} closeModal={closeNewMessageModal}/>
        <Container>
            <Stack direction="row">
                <Fab onClick={openNewMessageModal} style={messagesFabStyle} size="large" color="primary" aria-label="add">
                        <Add />
                    </Fab>
                <Stack width={window.innerWidth} direction="column" m={5} spacing ={2}>
                    {messages.map((message) => (
                                <IndividualMessages key={message.key} recipientId={message.recipientId} messageText={message.messageText} />
                            ))}
                </Stack>
                <Stack width={window.innerWidth} direction="column" m={5} spacing ={2}>
                {rooms.map((room) => (
                            <IndividualRooms key={room.key} roomName={room.name} members={room.members}/>
                        ))}
                </Stack>
                <Fab onClick={openNewRoomModal} style={roomsFabStyle} size="large" color="primary" aria-label="add">
                        <Add />
                    </Fab>
            </Stack>
        </Container>
    </div>
    )
}

export default Messages;
