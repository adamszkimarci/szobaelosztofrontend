import {makeStyles} from "@material-ui/core/styles";

const adminStyles = makeStyles((theme) => ({
    admin: {
        marginTop: theme.spacing(8),
        textAlign: 'center',
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default adminStyles;
