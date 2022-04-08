import  {React, useState, useEffect} from 'react';
import AllDiscussions from './AllDiscussions';
import DiscussionThread from './DiscussionThread';


const DiscussionCommentView = (props) => {
    const [showIndividualDiscussion, setDiscussion] = useState(true);
    const [discussionId, setDiscussionId] = useState("None");

    useEffect(() => {
        if(showIndividualDiscussion){  
            console.log("discussionId: " + discussionId);
            setDiscussion(false);
        }
        else{
            console.log("Showing individual discussion");
            console.log("discussionId: " + discussionId);
            setDiscussion(true);
        }
    }, [discussionId]);

    const toggleDiscussion = value => () => {
        setDiscussionId(value);
    }
    
    function View() {
        if(showIndividualDiscussion)
            return(
                <DiscussionThread discussionId={discussionId} toggleDiscussion={toggleDiscussion} goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin}/>
            )
        return(
            <AllDiscussions toggleDiscussion={toggleDiscussion} goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin}/>
        )
    }

    return <View />
};

export default DiscussionCommentView