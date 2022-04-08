import  {React, useState, useEffect} from 'react';
import AllDiscussions from './AllDiscussions';
import DiscussionThread from './DiscussionThread';


const DiscussionCommentView = (props) => {
    const [showIndividualDiscussion, toggleShowIndividualDiscussion] = useState(true);
    const [discussion, setDiscussion] = useState({"discussionId":"None"});

    useEffect(() => {
        if(showIndividualDiscussion){  
            console.log("discussionId: " + discussion.discussionId);
            toggleShowIndividualDiscussion(false);
        }
        else{
            console.log("Showing individual discussion");
            console.log("discussionId: " + discussion.discussionId);
            toggleShowIndividualDiscussion(true);
        }
    }, [discussion.discussionId]);

    const returnDiscussion = value => () => {
        setDiscussion(value);
    }
    
    function View() {
        if(showIndividualDiscussion)
            return(
                <DiscussionThread discussionId={discussion.discussionId} returnDiscussion={returnDiscussion} goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin}/>
            )
        return(
            <AllDiscussions returnDiscussion={returnDiscussion} goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin}/>
        )
    }

    return <View />
};

export default DiscussionCommentView