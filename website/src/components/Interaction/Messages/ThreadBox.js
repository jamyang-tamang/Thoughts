import  {React, useState, useEffect} from 'react';
import { Stack, Typography, Box, IconButton} from "@mui/material";


const ThreadBox = (props) => {


    const recipientId = (props) => {
        var members = (props.thread.participants).toString();
        members = members.replace(sessionStorage.getItem('user'),'');
        console.log(members)
        if(members.startsWith(","))
            members = members.replace(',','');
        else if(members.endsWith(","))
            members = members.replace(',','');
        members = members.replace(',,',',');
        return(members);
    }

    return (
        <div>
            <Stack key={props.thread.key} alignItems="flex-start" direction="row">
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
                    onClick={props.returnMessageThread(props.thread)}
                    > 
                    <Typography>{props.thread.createdAt} </Typography>
                    <Typography>{recipientId(props)} </Typography>
                </Box>
            </Stack>
        </div>
    )
    
}

export default ThreadBox