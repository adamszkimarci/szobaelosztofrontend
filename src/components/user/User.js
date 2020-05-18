import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useAuth} from "../connection/Auth";
import userStyles from "./UserStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function User(){
    const { authTokens } = useAuth();
    const classes = userStyles();
    const [value, setValue] = useState(0);
    const [epuletek, setEpuletek] = useState([]);
    const [szobak, setSzobak] = useState([]);
    const [epulet, setEpulet] = useState("");
    const [emelet, setEmelet] = useState("");
    const [szoba, setSzoba] = useState("");
    const [open, setOpen] = React.useState(false);
    const [isPosted, setPosted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [actepulet, setActEpulet] = useState("");
    const [actemelet, setActEmelet] = useState("");
    const [actszoba, setActSzoba] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPosted(false);
        setIsError(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeTab = () => {
        getEnJelentkezesem();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function getEpuletek() {
        axios.get("http://localhost:8080/epuletek", {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setEpuletek(result.data);
            }
        })
    }

    function getSzobak() {
        axios.get(
            "http://localhost:8080/szobak/epulet/" + epulet,
            {auth: {username:authTokens.username, password:authTokens.password}}
        ).then(result => {
            if (result.status === 200) {
                setSzobak(result.data);
            }
        })
    }

    function getEnJelentkezesem() {
        axios.get("http://localhost:8080/beosztas/mybeoszt/" + authTokens.username, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                if(result.data.length!==0) {
                    setActEpulet(result.data[0].epulet);
                    setActEmelet(result.data[0].emelet);
                    setActSzoba(result.data[0].szobaSzam);
                } else {
                    console.log("nincs jelentkezes");
                }
            }
        })
    }

    useEffect((props) => {
            getEnJelentkezesem(props)
        },
        []
    );

    const epuletekMenu = () => epuletek.map((g, id) =>
        <MenuItem value={g.epuletNev} key={id}>{g.epuletNev}</MenuItem>
    )

    const szobaMenu = () => szobak.filter(szb => szb.epuletNev===epulet).filter(szb => szb.emeletSzama===emelet).map((sg, id) =>
        <MenuItem value={sg.szobaSzama} key={id}>{sg.szobaSzama}</MenuItem>
    )

    function addJelentkezes() {
        axios.post("http://localhost:8080/beosztas", {
            neptunKod:authTokens.username,
            diakNeve:authTokens.nev,
            epulet:epulet,
            emelet:emelet,
            szobaSzam:szoba
        }, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setPosted(true);
                setEpulet("");
                setEmelet("");
                setSzoba("");
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    function duplaFunc() {
        if(actepulet.length!==0) {
            deleteJelentkezes();
            addJelentkezes();
        } else {
            addJelentkezes();
        }
    }

    function deleteJelentkezes() {
        axios.delete("http://localhost:8080/beosztas/mybeoszt/" + authTokens.username, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                getEnJelentkezesem();
            }
        });
    }

    const renderUserFields = () => {
        if(epulet==="A") {
            return(
                <Select
                    labelId="subgenre-label"
                    id="genre"
                    color="primary"
                    className={classes.textField}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={emelet}
                    onChange={e => {
                        setEmelet(e.target.value);
                    }}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                </Select>
            )
        } else {
            return(
                <Select
                    labelId="subgenre-label"
                    id="genre"
                    color="primary"
                    className={classes.textField}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={emelet}
                    onChange={e => {
                        setEmelet(e.target.value);
                    }}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            )
        }
    }

    if(authTokens.role==="ROLE_USER") {
        return(
            <React.Fragment>
                <Container maxWidth="lg" className={classes.user}>
                    <AppBar position="static" className={classes.root}>
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            indicatorColor="primary"
                            onChange={handleChange}
                            aria-label="nav tabs example"
                        >
                            <Tab label="Szobajelentkezés leadása" {...a11yProps(0)} />
                            <Tab label="Szobajelentkezés megtekintése" {...a11yProps(1)} onClick={(e) => {
                                changeTab(e)
                            }}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} className={classes.root}>
                        <div className={classes.root}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <Typography variant="h6">Kérlek, válaszd ki az épületet, emeletet és szobát!</Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <FormControl className={classes.textField} color="primary">
                                        <InputLabel required id="genre-label" shrink>Épület</InputLabel>
                                        <Select
                                            labelId="genre-label"
                                            color="primary"
                                            id="genre"
                                            className={classes.textField}
                                            onOpen={(e)=>{getEpuletek(e)}}
                                            value={epulet}
                                            onChange={e => {
                                                setEpulet(e.target.value);
                                            }}
                                        >
                                            {epuletekMenu()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <FormControl className={classes.textField} color="primary">
                                        <InputLabel required id="subgenre-label" shrink>Emelet</InputLabel>
                                        {renderUserFields()}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <FormControl className={classes.textField} color="primary">
                                        <InputLabel required id="subgenre-label" shrink>Szoba</InputLabel>
                                        <Select
                                            labelId="subgenre-label"
                                            color="primary"
                                            id="genre"
                                            className={classes.textField}
                                            onOpen={(e)=>{getSzobak(e)}}
                                            value={szoba}
                                            onChange={e => {
                                                setSzoba(e.target.value);
                                            }}
                                        >
                                            {szobaMenu()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className={classes.gridAll}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={(e)=>{duplaFunc(e)}}
                                        className={classes.button}
                                    >
                                        Jelentkezés leadása
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={classes.root}>
                        <div className={classes.secondMapContainer}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
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
                                <Grid item xs={5}/>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
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
                                <Grid item xs={5}/>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="Épület"
                                        value={actepulet}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}/>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="Emelet"
                                        value={actemelet}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}/>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="Szoba"
                                        value={actszoba}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}/>
                                <Grid item xs={12}>
                                    <Typography variant="body1" display="block" gutterBottom>Ha meg szeretné változtatni a jelentkezését kérjük adja le azt újból!</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    {isError &&
                    <Snackbar
                        open={isError}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        autoHideDuration={2000}
                        onClose={handleClosee}>
                        <Alert severity="error">Nem sikerült a jelentkezés leadása!</Alert>
                    </Snackbar>
                    }
                    {isPosted &&
                    <Snackbar
                        open={isPosted}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        autoHideDuration={2000}
                        onClose={handleClosee}>
                        <Alert severity="success">Sikeres jelentkezés leadás!</Alert>
                    </Snackbar>
                    }
                </Container>
            </React.Fragment>
        )
    } else {
        return (
            <div className={classes.user}>
                <img src='./error.png' alt="error-img" width="5%"/>
                <br/>
                <Typography variant="h5">
                    You are not an User.
                </Typography>
                <br/>
                <Typography variant="body1">
                    Get back to your page.
                </Typography>
            </div>
        );
    }
}

export default User;
