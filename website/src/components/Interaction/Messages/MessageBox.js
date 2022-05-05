import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";
const MessageBox = (props) => {

    if(props.thread.senderId !== sessionStorage.getItem('user')){
        return (
            <Stack key={props.thread.key} alignItems="flex-start" direction="row">
                <Box
                        sx={{
                            width: (window.innerWidth*0.4),
                            padding: 2,
                            borderRadius: 3,
                            borderTopLeftRadius: 2,
                            border: "solid black",
                            backgroundColor: 'primary.main',
                        }}
                        > 
                        <Typography color="white">{props.thread.text} </Typography>
                    </Box>
            </Stack>
        )
    }
    else{
        return (
            <Stack key={props.thread.key} style={{marginLeft:"40%"}} direction="row">
                <Box
                        sx={{
                            width: (window.innerWidth*0.4),
                            padding: 2,
                            borderRadius: 3,
                            borderTopRightRadius: 2,
                            border: "solid black",
                            backgroundColor: '#989898',
                        }}
                        > 
                        <Typography color="white">{props.thread.text} </Typography>
                    </Box>
            </Stack>
        )
    }
    
}

export default MessageBox