import { Avatar, CardContent, InputAdornment, OutlinedInput, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { PostWithAuth, RefreshToken } from "../../Services/HttpService";

const useStyles = makeStyles((theme) => ({
    comment : {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems : 'center',
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    link: {
        textDecoration: 'none',
        boxShadow: 'none',
        color: 'white'
    }
}));

function CommentFrom(props) {
    const {userId, userName, postId, setCommentRefresh} = props;
    const classes = useStyles();
    const [text, setText] = useState("");

    const logout = () => {
        localStorage.removeItem('tokenKey')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('refreshKey')
        localStorage.removeItem('userName')
        window.history.go(0)
    }
      const saveComment = () => {
        PostWithAuth("/comments", {
            postId: postId,
            userId: userId,
            text: text,
        })
          .then(res => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => {
                    if(!res.ok) {
                        logout()
                    }
                    else{
                        res.json()
                    }})
                .then((result) => {
                    if(result != undefined)
                    {
                        localStorage.setItem("tokenKey", result.accessToken);
                        localStorage.setItem('refreshKey', result.refreshToken);
                        saveComment()
                        setCommentRefresh()
                    }})
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else
            res.json()})
          .catch(err => {
            if(err=="Unauthorized"){
                
        }
      }
          )
    }
    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent className= {classes.comment}>
            <OutlinedInput
            id="outlined-adorment-amount"
            multiline
            inputProps={{maxLength: 250}}
            fullWidth
            onChange={(i) => handleChange(i.target.value)}
            startAdornment = {
                <InputAdornment position="start">
                    <Link className={classes.link} to={{pathname: '/users/' + userId}}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                </InputAdornment>
            } 
            endAdornment = {
                <InputAdornment position="end">
                    <Button
                        variant="contained"
                        style={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white'
                        }}
                        onClick={handleSubmit}
                    > Comment </Button>
                </InputAdornment>
            }
            value={text}
            style={{ color: 'black', backgroundColor: 'white'}}
            ></OutlinedInput>
        </CardContent>
    )
}

export default CommentFrom;