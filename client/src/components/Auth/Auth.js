import React, {useState} from 'react';
import { Avatar, Grid, Container, Button, Typography, Paper } from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import Icon from './icon';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
        console.log(formData);
    };
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleFailure = () => {
        console.log("Google login failed. Try again");
    }
    const googleSuccess =async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('/');
        }catch(error){
            console.log(error);
        }
        console.log(res);
    }
    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                        <Input name="email" label="Email ID" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    {isSignup ? 'Sign Up' : "Sign In"}
                </Button>
                <GoogleLogin 
                    clientId="345943953415-3mmr9v21tum2namhkrul3d21q1t982bf.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have a account? Sign In' : "Dont have a account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
         </Paper>  
        </Container>
    )
}

export default Auth
