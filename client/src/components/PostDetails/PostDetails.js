import React, { useEffect } from 'react';
import {Paper, Typography, CircularProgress, Divider, Link} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';
import { getPost } from '../../actions/posts';

const PostDetails = () => {
    const {post, posts, isLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
 
    useEffect(() =>{
        dispatch(getPost(id));
    }, [id]);

    console.log("Post Details");
    if(!post) return null;

    if (isLoading){
        return (<Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>);
    }

    return (
        <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
            <Link href={post.message} target="_blank" className={classes.link_default}>
            <div className={classes.card}>
            
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        
                                {/* <Link href={post.message} color="textSecondary" target="_blank" className={classes.link_default}>{post.message}</Link> */}

                        <Typography variant="h6">Created by: {post.name}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} /> */}
                    </div>
                    

                <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                {/* <iframe className={classes.media} src={post.message || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} /> */}
                </div>
             </div>
             </Link>
        </Paper>
    )
}

export default PostDetails
