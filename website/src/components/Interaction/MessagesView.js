import  {React, useState, useEffect} from 'react';
import AllMessagesThreads from './Messages/AllMessagesThreads';
import IndividualMessageThread from './Messages/IndividualMessageThread';
// import DiscussionThread from './DiscussionThread';


const MessageView = (props) => {
    // const [showIndividualDiscussion, toggleShowIndividualDiscussion] = useState(true);
    const [activeMessageThread, setActiveThread] = useState({"key":"None"});

    const returnMessageThread = value => () => {
        setActiveThread(value);
        console.log(value.key);
    }

    // const returnComment = value => () => {
    //     setComment(value);
    // }
    
    function View() {
        if(activeMessageThread.key != "None")
            return(
                <IndividualMessageThread logout={props.logout} 
                activeMessageThread={activeMessageThread} returnMessageThread={returnMessageThread} goToHome={props.goToHome} goToDiscussions={props.goToDiscussions} goToLogin={props.goToLogin}/>
            )
        return(
            <AllMessagesThreads logout={props.logout} activeMessageThread={activeMessageThread} returnMessageThread={returnMessageThread} goToHome={props.goToHome} goToDiscussions={props.goToDiscussions} goToLogin={props.goToLogin}/>
        )
    }

    return <View />
};

export default MessageView