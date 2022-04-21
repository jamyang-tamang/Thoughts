import { React, useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from '../../firebase-config'
import Modal from 'react-modal'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {db} from '../../firebase-config';
import {collection, addDoc} from "firebase/firestore";


const Login = (props) => {
    Modal.setAppElement(this);
    const [registerUserName, setRegisterUserName] = useState("");
    const [registerEmail, setRegisterEmail] = useState ("");
    const [registerPassword, setRegisterPassword] = useState ("");
    const [loginEmail, setLoginEmail] = useState ("");
    const [loginPassword, setLoginPassword] = useState ("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState ("");
    const [signUpErrorMessage, setSignupErrorMessage] = useState ("");
    const colRef = collection(db, 'users');  

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const createUser = () => {
      addDoc(colRef, {
          userName: registerUserName,
          email: registerEmail,
      })
  }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword);
            console.log(user);
            setSignupErrorMessage("");
            sessionStorage.setItem('user', JSON.stringify(registerEmail));
            createUser();
            props.goToHome();
        } catch (error) {
            console.log(error.message);
            setSignupErrorMessage(error.code);
        }
    };

    const login = async() => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword);
            console.log(user);
            setLoginErrorMessage("");
            sessionStorage.setItem('user', loginEmail);
            props.goToHome();
        } catch (error) {
            console.log(error.message);
            setLoginErrorMessage(error.code);
        }
    };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };


    const theme = createTheme();

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    return(
    <ThemeProvider theme={darkTheme}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        >
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  onChange={(event) => {
                    setRegisterUserName(event.target.value)
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value)
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value)
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Typography component="p" variant="h6" color="red" >
                {signUpErrorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                    <Button onClick={closeModal}>Already have an account? Sign in</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </Modal>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                    setLoginEmail(event.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                    setLoginPassword(event.target.value)
                }} 
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Typography component="p" variant="h6" color="red" >
                {loginErrorMessage}
              </Typography>
              <Button
                onClick={login}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <Button>Forgot password?</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link  href="#" variant="body2">
                    <Button onClick={openModal}> Don't have an account? Sign Up</Button>
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}

export default Login;