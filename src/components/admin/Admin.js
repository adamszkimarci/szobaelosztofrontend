import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {useAuth} from "../connection/Auth";
import adminStyles from "./AdminStyles";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";
import axios from "axios";

function Admin() {
    const { authTokens } = useAuth();
    const classes = adminStyles();
    const [jelentkezesek, setJelentkezes] = useState([]);
    const tableData = jelentkezesek.map(item => ({neptun:item.neptunKod, neve: item.diakNeve, epulet:item.epulet, emelet:item.emelet, szoba:item.szobaSzam}));

    function deleteJelentkezes(props){
        axios.delete("http://localhost:8080/beosztas/mybeoszt/" + props, {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                console.log("sikeres törlés");
            }
        });
    }

    function getAllJelentkezes() {
        axios.get("http://localhost:8080/beosztas", {auth: {username:authTokens.username, password:authTokens.password}}).then(result => {
            if (result.status === 200) {
                setJelentkezes(result.data);
            }
        })
    }

    useEffect((props) => {
            getAllJelentkezes(props)
        },
        []
    );

    if(authTokens.role==="ROLE_ADMIN") {
        return (
            <React.Fragment>
                <div className={classes.admin}>
                    <Container maxWidth="md">
                        <MaterialTable
                            icons={TableIcons}
                            title="Szobajelentkezések"
                            columns={[
                                { title: 'Neptun-kód', field: 'neptun' },
                                { title: 'Név', field: 'neve' },
                                { title: 'Épület', field: 'epulet'},
                                { title: 'Emelet', field: 'emelet'},
                                { title: 'Szoba', field: 'szoba'},
                            ]}
                            data={tableData}
                            options={{
                                exportButton: true
                            }}
                            editable={{
                                onRowDelete: (oldData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                            deleteJelentkezes(oldData.neptun);
                                        }, 600);
                                    }),
                            }}
                        />
                    </Container>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <div className={classes.admin}>
                <img src='./error.png' alt="error-img" width="5%"/>
                <br/>
                <Typography variant="h5">
                    You are not an Admin.
                </Typography>
                <br/>
                <Typography variant="body1">
                    Get back to your page.
                </Typography>
            </div>
        );
    }
}

export default Admin;
