import  {React} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";

const IndividualMessages = (props) => {

    return (
        <div>
            <Stack key={props.discussionId} alignItems="flex-start" direction="row">
                <Box
                    sx={{
                        padding: 4,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }} 
                    // onClick={props.returnDiscussion(props)}
                    > 
                    <Typography>{props.sender} </Typography>
                </Box>
            </Stack>
        </div>
    )
    
}

export default IndividualMessages