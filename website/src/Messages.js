import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Messages = (props) => {

    const messages = [
        {name: 'Sample Message', key: '0'},
        {name: 'Sample Message', key: '1'},
        {name: 'Sample Message', key: '2'},
        {name: 'Sample Message', key:'3'},
        {name: 'Sample Message', key:'4'},
        {name: 'Sample Message', key:'5'},
        {name: 'Sample Message', key:'604'},
        {name: 'Sample Message', key:'605'},
        {name: 'Sample Message', key:'606'},
        {name: 'Sample Message', key:'607'},
        {name: 'Sample Message', key:'608'},
        {name: 'Sample Message', key:'80'}
    ];
    const rooms = [
        {name: 'Sample Room', key: '0'},
        {name: 'Sample Room', key: '1'},
        {name: 'Sample Room', key: '2'},
        {name: 'Sample Room', key: '3'},
        {name: 'Sample Room', key: '4'},
        {name: 'Sample Room', key: '5'},
        {name: 'Sample Room', key:'604'},
        {name: 'Sample Room', key:'605'},
        {name: 'Sample Room', key:'606'},
        {name: 'Sample Room', key:'607'},
        {name: 'Sample Room', key:'608'},
        {name: 'Sample Room', key:'80'}
    ];


    function Item(props) {
        return <li>{props.value}</li>;
    }

    function MyList(items) {
        return (
            <ul>
                {items.map((item) => <Item key={item.key} value={item.name} />)}
            </ul>
        );
    }
    return(
    <div>
        <button onClick={props.goToDiscussions}>Discussions</button>
        <button onClick={props.goToHome}>Home</button>
        <Container>
            <div>
            <Row className={"show-grid"}>
                <Col>
                    <div>
                        <ul>
                            {messages.map((item) => (
                                <li key={item.key}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col>
                    <div>
                        <ul>
                            {rooms.map((item) => (
                                <li key={item.key}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
    </div>
    )
}

export default Messages;