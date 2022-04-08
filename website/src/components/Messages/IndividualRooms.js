import  {React} from 'react';
import { Stack, Typography, Box} from "@mui/material";

const IndividualRooms = (props) => {

    return (
        <div>
            <Stack key={props.discussionId} alignItems="flex-start" direction="row">
                <Box
                    sx={{
                        width: "100%",
                        padding: 4,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }} 
                    // onClick={props.returnDiscussion(props)}
                    > 
                    <Typography>{props.roomName} </Typography>
                    {props.members.map((member) => (
                        <Typography>{member + " ,"}</Typography>
                ))}
                </Box>
            </Stack>
        </div>
    )
    
}

export default IndividualRooms