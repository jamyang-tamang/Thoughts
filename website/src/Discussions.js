import React from "react";
import { useState, useEffect} from 'react';
import { signOut } from "firebase/auth";
import {auth} from './firebase-config'
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {db} from "./firebase-config";

const Discussions = (props) => {
    const [discussions, setDiscussions] = useState([]);

    // useEffect(()=> {
    //     db.collection("posts")
    //     .orderBy("createdAt", "title")
    //     .get()
    //     .then((querySnapshot) => {
    //       const data = querySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }));
  
    //       setDiscussions(data);
    //     });
    // }, []);
    
    const discussionsStyle={
        alignContent: 'center',
        flex: 5,
        flexDirection: "row",
        // marginLeft: '${window.innerWidth}px',
    }

    const discussionStyle={
        width: window.innerWidth*.8,
        height: window.innerWidth/15,
        background: "grey",
        marginTop: 5,
        marginBottom: 5,
    }


    function Item(props) {
        return <div style={discussionStyle} key = {props.key}> 
        <div style={{ textAlign: 'center'}}>{props.name}</div>
        <div>
            <div> Upvotes: {props.upvotes}</div>
            <div> Downvotes: {props.downvotes}</div>
            <div> Comments: {props.comments}</div>
        </div>
        <div style={{textAlign: 'right'}}> Original Poster: {props.createdBy}</div>
        </div>;
    }

    const logout = async () => {
        await signOut(auth);
        props.goToLogin();
    };

    // function MyList(items) {
    //     return (
    //         <ul>
    //             {items.map((item) => <Item key={item.key} value={item} />)}
    //         </ul>
    //     );
    // }
    
    return(
        <div>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToHome}>Home</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={logout}>LogOut</button>
            </div>
            
            
            <div style={{flex:5, flexDirection: "column", marginLeft: window.innerWidth*0.1, marginnRight: window.innerWidth*0.1}}>
                <div style={{flex: 1}}/>
                <div style={discussionsStyle}>
                    <div style={{flex: 3}}>
                        {discussions.map((item) => (
                            <Item key={item.key} name={item.name} thumbnail={item.thumbnail} upvotes={item.upvotes} downvotes={item.downvotes} comments={item.comments} createdBy={item.createdBy}/>
                        ))}
                    </div>
                </div>
                <div style={{flex: 1}}/>
            </div>

        <Fab size="large" color="primary" aria-label="add">
            <Add />
        </Fab>
            
        </div>
    )
}

export default Discussions;

