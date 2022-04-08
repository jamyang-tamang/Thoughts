import  {React} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";

const IndividualMessages = (props) => {

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
                    > 
                    <Typography>{props.recipientId} </Typography>
                    <Typography>{props.messageText} </Typography>
                </Box>
            </Stack>
        </div>
    )
    
}

export default IndividualMessages