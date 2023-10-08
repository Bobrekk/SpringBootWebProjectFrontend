import {useState, useEffect, React, forwardRef} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Post from '../Post/Post'
import { GetWithAuth } from '../../Services/HttpService';

const useStyles = makeStyles({
    root: {
        width:'100%',
    },
    container: {
        maxHeight: 440,
        minWidth: 100,
        maxWidth: 800,
        marginTop: 50,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: 2,
        flex: 1,
    },
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function PopUp(props) {
    const classes = useStyles();
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState(null);

    const getPost = () => {
      GetWithAuth("/posts/"+postId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])
    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        {post ? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}
        title = {post.title} text = {post.text}/> : "Loading"}
      </Dialog>
    )
}

function UserActivity(props) {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows,setRows] = useState([]);
    const {userId} = props
    const classes = useStyles();
    const [selectedPost, setSelectedPost] = useState(null);
    const [isOpen, setIsOpen] = useState();


    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    const getActivity = () => {
        fetch("/users/activity/"+userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
        .then(res => res.json()
        .then(
            (result) => {
                console.log(result)
                setIsLoaded(true);
                setRows(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )
        )
    }

    useEffect(() => {
        getActivity();
    }, [])

  return (
    <div>
        {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/> : ""}
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              User Activity
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
                return (
                    <Button onClick={() => handleNotification(row[1])}>
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {row[3] + " " + row[0] + " your post"}
                    </TableRow>
                    </Button>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>  
  );
}

export default UserActivity