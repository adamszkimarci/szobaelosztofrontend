import {makeStyles} from "@material-ui/core/styles";

const headerStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        flexGrow: 1,
        textAlign: "end"
    },
    title: {
        marginLeft: 1 +'%'
    },
    authButton: {
        color: "whitesmoke",
        textDecoration: "none",
        padding: theme.spacing(1)
    },
    sosButton: {
        color: "whitesmoke",
        textDecoration: "none",
    },
    profileButton: {
        padding: theme.spacing(0),
        color: "whitesmoke",
        textDecoration: "none"
    }
}));

export default headerStyles;
