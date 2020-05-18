import React from "react";
import Typography from "@material-ui/core/Typography";
import {useAuth} from "../connection/Auth";
import mainContentStyles from "./MainContentStyles";

function MainContent() {
    const classes = mainContentStyles();
    const { authTokens } = useAuth();
    if(!authTokens){
        return (
                <div className={classes.root}>
                    <Typography variant="h4">
                        Üdvözöljük a Szobaelosztó oldalán.
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        Ha szobát szeretne választani, akkor az emailben kapott neptun-kód és jelszó párosítással kérjük lépjen be.
                    </Typography>
                </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Typography variant="h4">
                    Üdvözöllek {authTokens.nev}!
                </Typography>
                <br/>
                <Typography variant="body1">
                    Sikeresen bejelentkeztél.
                </Typography>
            </div>
        );
    }
}

export default MainContent;
