import { Stack, Typography, Box, Button} from "@mui/material"

const Discussion = (props) => {
    return (
        <Stack key={props.id} alignItems="flex-start" direction="row">
            <Stack direction="Column">
                <Stack direction="Row">
                    <Button>Upvote</Button>
                    <Button>Downvote</Button>
                </Stack>
                <Stack direction="Row">
                    <Box>Upvote IMG</Box>
                    <Box>Downvote IMG</Box>
                </Stack>
            </Stack>
            <Box
                sx={{
                    width: 500,
                    height: 300,
                    padding: 4,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
                > 
                <Typography>{props.title} </Typography>
            </Box>
        </Stack>
    )
}

export default Discussion