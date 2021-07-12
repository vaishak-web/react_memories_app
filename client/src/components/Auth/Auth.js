import React from 'react';
import { Avatar, Grid, Container, TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";

const Auth = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                </Avatar>     
         </Paper>  
        </Container>
    )
}

export default Auth
