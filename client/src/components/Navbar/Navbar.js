import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button} from "@material-ui/core";
import {useHistory, Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import useStyles from "./styles";
import memories from '../../images/memories.jpg';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user);
  useEffect(() =>{
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} varient="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign IN</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
