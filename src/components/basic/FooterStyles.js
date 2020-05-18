import {makeStyles} from "@material-ui/core/styles";

const footerStyles = makeStyles((theme) => ({
    root: {
        position:"absolute",
        bottom:"0",
        paddingBottom:15 + 'px',
        textAlign:"center",
        width:100 + '%'
    },
}));

export default footerStyles;
