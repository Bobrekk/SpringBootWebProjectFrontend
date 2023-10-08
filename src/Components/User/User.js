import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Avatar from '../Avatar/Avatar'
import { makeStyles } from "@material-ui/core";
import UserActivity from '../UserActivity/UserActivity'
import { GetWithAuth } from "../../Services/HttpService";

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
});

function User() {
    const {userId} = useParams();
    const classes = useStyles();
    const [user, setUser] = useState();

    const getUser= () => {
        GetWithAuth("/users/"+userId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        getUser()
    }, [])

    return(
        <div className={classes.root}>
            {user ? <Avatar userId= {userId} userName= {user.userName} avatarId={user.avatarId}/> : ""}
            {localStorage.getItem('currentUser') == userId ? <UserActivity userId={userId}/> : ""}
        </div>
    )

}
export default User;