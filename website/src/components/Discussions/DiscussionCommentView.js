import  {React, useState, useEffect} from 'react';
import AllDiscussions from './Discussions/AllDiscussions';
import DiscussionThread from './Discussions/DiscussionThread';


const DiscussionCommentView = (props) => {
    // const [showIndividualDiscussion, toggleShowIndividualDiscussion] = useState(true);
    const [activeDiscussion, setDiscussion] = useState({"discussionId":"None"});
    const [activeComment, setComment] = useState({"commentId":"None"});

    // useEffect(() => {
    //     if(showIndividualDiscussion){  
    //         console.log("discussionId: " + discussion.discussionId);
    //         toggleShowIndividualDiscussion(false);
    //     }
    //     else{
    //         console.log("Showing individual discussion");
    //         console.log("discussionId: " + discussion.discussionId);
    //         toggleShowIndividualDiscussion(true);
    //     }
    // }, [discussion.discussionId]);

    const returnDiscussion = value => () => {
        setDiscussion(value);
    }

    const returnComment = value => () => {
        setComment(value);
    }
    
    function View() {
        if(activeDiscussion.discussionId != "None")
            return(
                <DiscussionThread logout={props.logout} returnComment={returnComment} activeComment={activeComment} activeDiscussion={activeDiscussion} returnDiscussion={returnDiscussion} goToHome={props.goToHome} goToInteractions={props.goToInteractions} goToLogin={props.goToLogin}/>
            )
        return(
            <AllDiscussions logout={props.logout} returnDiscussion={returnDiscussion} goToHome={props.goToHome} goToInteractions={props.goToInteractions} goToLogin={props.goToLogin}/>
        )
    }

    return <View />
};

export default DiscussionCommentView