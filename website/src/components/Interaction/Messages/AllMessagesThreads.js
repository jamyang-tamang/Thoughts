import {React, useEffect, useState} from "react";
import { db } from "../../../firebase-config";
import {Stack, Container} from '@mui/material'
import ThreadBox from "./ThreadBox";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import NewMessageModal from "../Modals/NewMessageModal";
import TextField from '@mui/material/TextField';

const AllMessagesThreads = (props) => {
    const [messagesThreads, setMessageThreads] = useState([]);
    const [validMessageThreads, setValidMessageThreads] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newMessageThreadModalState, setNewMessageThreadModalState] = useState(false);
    const [userSearch, setUserSearch] = useState("");

    useEffect(()=> {
        
        let q = query (collection(db, "messageThread"), where("participants", "array-contains", sessionStorage.getItem('user')));
        onSnapshot(q, (querySnapshot) => {
            const messagesThreads = [];
            querySnapshot.forEach((doc) => {
                messagesThreads.push({...doc.data(), key: doc.id});
            })
            setMessageThreads(messagesThreads);
            setValidMessageThreads(messagesThreads);
        },
        (error) => {
            console.log(error.message)
        })
    }, []);

    const match = (element) => element.includes(userSearch);
    
    useEffect(()=> {
            if(userSearch !== ""){
                console.log("Filtered ");
                console.log(messagesThreads.filter(message => message.participants.filter(participant => participant.includes(userSearch))));
                setValidMessageThreads(messagesThreads.filter(message => message.participants.some(match)));
                console.log("Unfiltered " );
                console.log(validMessageThreads);
            }
            else{
                setValidMessageThreads(messagesThreads);
            }
        }, [userSearch]);
    

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

    function openNewMessageThreadModal(){
        setNewMessageThreadModalState(true);
    }

    function openNewRoomModal(){
        console.log();
    }

    const closeNewMessageThreadModal = () => {
        setNewMessageThreadModalState(false);
    }

    const messagesFabStyle = {
        margin: 0,
        top: 'auto',
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
            <button onClick={props.logout}>LogOut</button>
        </div>
        
        <Stack direction="column">
                <NewMessageModal modalIsOpen={newMessageThreadModalState} closeModal={closeNewMessageThreadModal}/>
                <Container>
                    <TextField onChange={(event) => {
                        setUserSearch(event.target.value)
                    }} id="outlined-search" label="Search field" type="search" fullWidth />
                    <Stack direction="row">
                        <Fab onClick={openNewMessageThreadModal} style={messagesFabStyle} size="large" color="primary" aria-label="add">
                            <Add />
                        </Fab>
                        <Stack width={window.innerWidth} direction="column" m={5} spacing ={2}>
                            {validMessageThreads.map((thread) => (
                                        <ThreadBox returnMessageThread={props.returnMessageThread} key={thread.key} thread={thread} />
                                    ))}
                        </Stack>
                        {/* <Stack width={window.innerWidth} direction="column" m={5} spacing ={2}>
                        {rooms.map((room) => (
                                    <IndividualRooms key={room.key} room={room}/>
                                ))}
                        </Stack> */}
                        <Fab onClick={openNewRoomModal} style={roomsFabStyle} size="large" color="primary" aria-label="add">
                            <Add />
                        </Fab>
                    </Stack>
                </Container>
        </Stack>
    </div>
    )
}

export default AllMessagesThreads;
