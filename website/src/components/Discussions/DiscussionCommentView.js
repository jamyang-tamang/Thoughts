import  {React, useState, useEffect} from 'react';
import Discussions from './Discussions';
import DiscussionThread from './DiscussionThread';


const DiscussionCommentView = (props) => {
    const [showDiscussion, setDiscussion] = useState(true);

    function toggleDiscussion(){
        console.log("TogglingDiscussions");
        if(showDiscussion)
            setDiscussion(false);
        else
            setDiscussion(true);
    }
    
    function View() {
        if(showDiscussion)
            return(
                <Discussions toggleDiscussion={toggleDiscussion} goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin}/>
            )
        return(
            <DiscussionThread goToHome={props.goToHome} goToMessages={props.goToMessages} goToLogin={props.goToLogin} toggleDiscussion={toggleDiscussion}/>
        )
    }

    return <View />
};

export default DiscussionCommentView