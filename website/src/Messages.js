import React from "react";
import { Container, Row, Col } from "react-bootstrap";

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

    const messagesStyle={
        height: window.innerWidth/25,
        background: "grey",
        marginTop: 5,
        marginBottom: 5,
    }

    function Message(props) {
        return <div style={messagesStyle} key = {props.key}> 
                <div style={{ textAlign: 'left'}}>{props.messenger}</div>
                <div style={{textAlign: 'left'}}> {props.messageBrief}</div>
        </div>;
    }

    function Room(props) {
        return <div style={messagesStyle} key = {props.key}> 
                <div style={{ textAlign: 'left'}}>{props.name}</div>
                <div style={{textAlign: 'left'}}> 
                <ul>
                    {props.members.map((member) => (
                        <li>{member}</li>
                    ))}
                    </ul>{props.members}</div>
        </div>;
    }

    return(
    <div>
        <div style = {{textAlign: "center"}}>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToHome}>Home</button>
        </div>
        <div className={"container"}>
            <div> Search Bar</div>
            <div>
                <div>
                    <ul>
                        {messages.map((message) => (
                            <Message key={message.key} messenger={message.messenger} messageBrief={message.messageBrief} />
                        ))}
                    </ul>
                </div>
            </div>
        
            <div>
                <div>
                    <ul>
                        {rooms.map((room) => (
                            <Room key={room.key} name={room.name} members={room.members}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Messages;
