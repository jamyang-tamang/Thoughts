import React from "react";

const Discussions = (props) => {
    const discussions = [
        {name: 'Sample Discussions', key: '0', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key: '1', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key: '2', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'3', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'4', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'5', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'604', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'605', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'606', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'607', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'608', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'},
        {name: 'Sample Discussions', key:'80', upvotes: '3', downvotes: '2', comments: '5', createdBy: 'adx_333'}
    ];

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

    function MyList(items) {
        return (
            <ul>
                {items.map((item) => <Item key={item.key} value={item} />)}
            </ul>
        );
    }
    return(
        <div>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToHome}>Home</button>
                <button onClick={props.goToMessages}>DMs</button>
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
            
        </div>
    )
}

export default Discussions;

