import React from "react";
import { signOut } from "firebase/auth";
import {auth} from '../../firebase-config'
import {Stack, Container} from '@mui/material'
import IndividualMessages from "./IndividualMessages";
import IndividualRooms from "./IndividualRooms";

const Messages = (props) => {

    const messages = [
        {messenger: 'John Doe', key: '0', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key: '1', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key: '2', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'3', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'4', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'5', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'604', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'605', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'606', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'607', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'608', messageBrief: 'Lorem Ipsum?' },
        {messenger: 'John Doe', key:'80', messageBrief: 'Lorem Ipsum?' }
    ];
    const rooms = [
        {name: 'Sample Room', key: '0', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key: '1', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key: '2', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key: '3', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key: '4', members: ['jd', 'j sd', 'jd', 'jd']},
        {name: 'Sample Room', key: '5', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'604', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'605', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'606', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'607', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'608', members: ['jd', 'jd', 'jd', 'jd']},
        {name: 'Sample Room', key:'80', members: ['jd', 'jd', 'jd', 'jd']},
    ];

    const logout = async () => {
        await signOut(auth);
        props.goToLogin();
    };

    return(
    <div>
        <div style = {{textAlign: "center"}}>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToHome}>Home</button>
            <button onClick={logout}>LogOut</button>
        </div>
        
        <div> Search Bar</div>
        <Container>
            <Stack direction="row">
                <Stack direction="column" m={5} spacing ={2}>
                {messages.map((message) => (
                            <IndividualMessages key={message.key} sender={message.messenger} messageBrief={message.messageBrief} />
                        ))}
                </Stack>
                <Stack direction="column" m={5} spacing ={2}>
                {rooms.map((room) => (
                            <IndividualRooms key={room.key} roomName={room.name} members={room.members}/>
                        ))}
                </Stack>
            </Stack>
        </Container>
    </div>
    )
}

export default Messages;
