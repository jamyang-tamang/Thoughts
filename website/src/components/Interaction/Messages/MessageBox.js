import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
const MessageBox = (props) => {

    if(props.thread.senderId !== sessionStorage.getItem('user')){
        return (
            <Stack key={props.thread.key} alignItems="flex-start" direction="row">
                <Box
                        sx={{
                            width: (window.innerWidth*0.3),
                            padding: 2,
                            border: "solid black",
                            backgroundColor: 'primary.main',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        > 
                        <Typography color="white">{props.thread.text} </Typography>
                    </Box>
            </Stack>
        )
    }
    else{
        return (
            <Stack key={props.thread.key} style={{marginLeft:"50%"}} direction="row">
                <Box
                        sx={{
                            width: (window.innerWidth*0.3),
                            padding: 2,
                            border: "solid black",
                            backgroundColor: 'secondary.main',
                            '&:hover': {
                            backgroundColor: 'secondary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        > 
                        <Typography color="white">{props.thread.text} </Typography>
                    </Box>
            </Stack>
        )
    }
    
}

export default MessageBox