import  {React} from 'react';
import { Stack, Typography, Box} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const ThreadBox = (props) => {

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
              main: '#D16666',
            },
            secondary: {
              main: '#ffffff',
            },
        },
      });

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
        <ThemeProvider theme={theme}>
            <Stack key={props.thread.key} alignItems="flex-start" direction="row">
                <Box
                    sx={{
                        width: "100%",
                        padding: 4,
                        border: "solid white",
                        boxShadow: 3,
                        backgroundColor: '#63B0CD',
                        '&:hover': {
                        backgroundColor: '#60AB9A',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    onClick={props.returnMessageThread(props.thread)}
                    > 
                    <Typography>{props.thread.createdAt} </Typography>
                    <Typography>{recipientId(props)} </Typography>
                </Box>
            </Stack>
        </ThemeProvider>
    )
    
}

export default ThreadBox