import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useAuth} from "../connection/Auth";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import profileStyles from "./ProfileStyles";
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Profile(props) {
    const classes = profileStyles();
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("");
    const { authTokens } = useAuth();
    const [changePw, setChangePw] = useState(false);

    const handlePassword = () => {
        setChangePw(prev => !prev);
    };

    function changePassword() {
        axios.put("http://localhost:8080/users/changepassword/" + authTokens.id, {
            password
        }, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setChangePw(false);
            }
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsError(false);
    };

    const renderUserFields = () => {
        if(authTokens && !changePw && (authTokens.role==="ROLE_USER")) {
            return (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="button" display="block" gutterBottom>Ha még nem változtatta meg a jelszavát kérjük az első belépés után tegye ezt meg!</Typography>
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Neptun-kód"
                                    value={authTokens.username}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Név"
                                    value={authTokens.nev}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Email"
                                    value={authTokens.emailCim}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}/>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    endIcon={<LockIcon />}
                                    onClick={handlePassword}
                                >
                                    Password
                                </Button>
                            </Grid>
                        </Grid>
                    </>
            )
        } else if(authTokens && changePw){
            return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Please, enter your new password!</Typography>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <TextField
                        id="outlined-disabled"
                        label="Password"
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}/>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<ArrowBackIcon/>}
                        onClick={(e) => {handlePassword(e)}}

                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<SaveIcon/>}
                        onClick={(e) => {changePassword(e)}}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            )
        } else if(authTokens && authTokens.role==="ROLE_ADMIN"){
            return(
                <Grid container spacing={2}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Neptun-kód"
                        value={authTokens.username}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Név"
                        value={authTokens.nev}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Email"
                        value={authTokens.emailCim}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        endIcon={<LockIcon />}
                        onClick={handlePassword}
                        >
                            Password
                        </Button>
                </Grid>
                <Grid item xs/>
            </Grid>
            )
        }
    };

    return(
        <React.Fragment>
            <div className={classes.profile}>
                <Container maxWidth="xs">
                        {renderUserFields()}
                        { isError &&
                            <Snackbar
                                open={isError}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                autoHideDuration={3000}
                                onClose={handleClose}>
                                <Alert severity="error">Edit failed!</Alert>
                            </Snackbar>
                        }
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Profile;
