import {makeStyles} from "@material-ui/core/styles";

const profileStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    profile: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default profileStyles;
