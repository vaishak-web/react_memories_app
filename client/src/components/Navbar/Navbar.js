import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button} from "@material-ui/core";
import {useHistory, Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import useStyles from "./styles";
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user);
  useEffect(() =>{
    const token = user?.token;
    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  },[location]);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
      {/* <Typography variant="h6">Share Your Blogs</Typography> */}
        <img src={memoriesText}  alt="Blogs"  height="40px"/>
        <img  className={classes.image}  src={memoriesLogo}  alt="Blogs"  height="40px"/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant="contained" color="primary">SignIN</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
