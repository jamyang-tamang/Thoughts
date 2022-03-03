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
        // alignItems: 'center',
        flex: 1,
        // justifyContent: 'center'
    }

    const discussionStyle={
        width: window.innerWidth*.8,
        height: window.innerWidth/40,
        background: "grey",
        marginTop: 5,
        marginBottom: 5,
    }


    function Item(props) {
        return <div style={discussionStyle} key = {props.key}> 
        <div style={{justifyContent: 'flex-start', flexDirection: 'row'}}>{props.name}</div>
        <div >{props.upvotes}</div>
        <div>{props.downvotes}</div>
        <div>{props.comments}</div>
        <div> {props.createdBy}</div>
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
        <div style={{}}>
            <button onClick={props.goToHome}>Home</button>
            <button onClick={props.gotToMessages}>DMs</button>
            <div style={discussionsStyle}>
                    {discussions.map((item) => (
                        <Item key={item.key} name={item.name} thumbnail={item.thumbnail} upvotes={item.upvotes} downvotes={item.downvotes} comments={item.comments} createdBy={item.createdBy}/>
                    ))}
            </div>
            <div>why</div>
        </div>
    )
}

export default Discussions;