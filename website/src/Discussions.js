import React from "react";

const Discussions = (props) => {
    const discussions = [
        {name: 'Sample Discussions', key: '0'},
        {name: 'Sample Discussions', key: '1'},
        {name: 'Sample Discussions', key: '2'},
        {name: 'Sample Discussions', key:'3'},
        {name: 'Sample Discussions', key:'4'},
        {name: 'Sample Discussions', key:'5'},
        {name: 'Sample Discussions', key:'604'},
        {name: 'Sample Discussions', key:'605'},
        {name: 'Sample Discussions', key:'606'},
        {name: 'Sample Discussions', key:'607'},
        {name: 'Sample Discussions', key:'608'},
        {name: 'Sample Discussions', key:'80'}
    ];



    function Item(props) {
        return <li>{props.value}</li>;
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
            <button onClick={props.goToHome}>Home</button>
            <button onClick={props.gotToMessages}>DMs</button>
            <div>
                <ul>
                    {discussions.map((item) => (
                        <li key={item.key}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Discussions;