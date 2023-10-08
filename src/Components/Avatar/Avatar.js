import React, { useState } from "react";
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemSecondaryAction, Modal, Radio } from "@material-ui/core";
import { PutWithAuth } from "../../Services/HttpService";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 50,
  },
  modal: {
    display:'flex',
    maxWidth: 200,
  }
});

function Avatar(props) {
  const {avatarId, userId, userName} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(avatarId)

  const saveAvatar = () => {
    PutWithAuth("/users/"+localStorage.getItem('currentUser'), {
      userId: userId,
      userName: userName,
      avatar: selectedValue,
    }) 
    .then((res) => res.json())
    .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  return (
    <div>
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="User Avatar"
        image={`/avatars/avatar${selectedValue}.png`} 
        title="User Avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User Info
        </Typography>
      </CardContent>
      <CardActions>
        {localStorage.getItem('currentUser') == userId ? <Button size="small" color="primary" onClick={handleOpen}>Change Avatar</Button>
        : ""}
      </CardActions>
    </Card>
    <Modal
    className={classes.modal}
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    >
      <List dense>
        {[0,1].map((key) => {
          const labelId = `checkbox-list-secondary-label-${key}`;
          return (
            <ListItem key={key} button>
              <CardMedia
              style={{maxWidth: 100}}
              component="img"
              alt={`Avatar n°${key}.png`}
              image={`/avatars/avatar${key}.png`}
              title="User Avatar"
              />
              <ListItemSecondaryAction>
                <Radio
                edge='end'
                value={key}
                onChange={handleChange}
                checked={""+selectedValue === ""+key}
                inputProps={{ 'aria-labelledby': labelId}}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Modal>
    </div>
  )
}

export default Avatar