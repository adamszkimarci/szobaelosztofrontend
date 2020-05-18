import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {useAuth} from "../connection/Auth";
import headerStyles from "./HeaderStyles";

function Header() {
    const classes = headerStyles();
    const { authTokens, setAuthTokens } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function logOut() {
        setAuthTokens();
        handleClose();
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton aria-label="home" color="inherit">
                        <Link to="/" className={classes.authButton}>
                            <HomeIcon fontSize="large" />
                        </Link>
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Szobaeloszto v1
                    </Typography>
                    {!authTokens && (
                        <div className={classes.menuButton}>
                            <Button><Link to="/sign-in" className={classes.authButton}>Bejelentkezés</Link></Button>
                        </div>
                        )}
                    {authTokens && (
                        <div className={classes.menuButton}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                {authTokens.role==="ROLE_ADMIN" && (<Link to="/admin" className={classes.profileButton}><MenuItem onClick={handleClose}>Admin Oldal</MenuItem></Link>)}
                                {authTokens.role==="ROLE_USER" && (<Link to="/user" className={classes.profileButton}><MenuItem onClick={handleClose}>Felhasználói Oldal</MenuItem></Link>)}
                                <Link to="/my-profile" className={classes.profileButton}><MenuItem onClick={handleClose}>Profil</MenuItem></Link>
                                <MenuItem onClick={logOut}>Kijelentkezés</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;
