import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { LockOpen } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
    link: {
        textDecoration: 'none',
        boxShadow: 'none',
        color: 'white',
    }
}))


function Navbar() {
    const classes = useStyles();

    const onClick = () => {
        localStorage.removeItem('tokenKey')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('refreshKey')
        localStorage.removeItem('userName')
        window.history.go(0)
    }
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        <Link className={classes.link} to='/'>Home</Link>
                    </Typography>
                    <Typography variant='h6'>
                        {localStorage.getItem('currentUser') == null ? <Link className={classes.link} to="/auth">Login/Register</Link>:
                        <div><IconButton className={classes.link} onClick={onClick}><LockOpen></LockOpen></IconButton>
                        <Link className={classes.link} to={{pathname: "/users/" + localStorage.getItem('currentUser')}}>Profile</Link>
                        </div>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar