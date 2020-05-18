import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth} from "../connection/Auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import signInStyles from "./SignInStyles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignIn(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authTokens, setAuthTokens } = useAuth();
    const classes = signInStyles();

    function postLogin() {
        axios.post("http://localhost:8080/users/login", {}, {
            auth:{username:username,password:password}
        }).then(result => {
            if (result.status === 200) {
                result.data.password = password;
                setAuthTokens(result.data);
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        if(authTokens.role === "ROLE_ADMIN")
            return <Redirect to="/admin" />;
        else if(authTokens.role === "ROLE_USER")
            return <Redirect to="/user" />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsError(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Bejelentkezés
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Neptun-kód"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                    />
                    <TextField
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Jelszó"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        onClick={(e) => {postLogin(e)}}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Bejelentkezés
                    </Button>
                    { isError &&
                    <Snackbar
                        open={isError}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert severity="error">Invalid username or password!</Alert>
                    </Snackbar>
                    }
                </form>
            </div>
        </Container>
    );
}
export default SignIn;
