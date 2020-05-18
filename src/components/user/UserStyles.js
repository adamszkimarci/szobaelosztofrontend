import {makeStyles} from "@material-ui/core/styles";

const userStyles = makeStyles((theme) => ({
    user: {
        marginTop: theme.spacing(8),
        textAlign: 'center',
    },
    firstMapContainer: {
        width: 400 + 'px',
        height: 400 + 'px'},
    secondMapContainer: {
        width: 100 + '%',
        height: 100 + '%'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    material: {
        backgroundColor: theme.palette.background.paper,
        variant: 'outlined'
    },
    infoWindow: {
        textAlign: 'center',
        margin: 0 + 'auto'
    },
    textField: {
        width: '30ch',
    },
    backButton: {
        textAlign: 'start',
        marginLeft: 2 + '%'
    },
    smallField: {
        width: '14ch',
    },
    gridFrom: {
        textAlign: 'end'
    },
    gridTo: {
        textAlign: 'start'
    },
    gridAll: {
        textAlign: 'center'
    },
}));

export default userStyles;
