import React from 'react'
import{Card, CardActions, CardContent, CardMedia, Button, Typography, Link, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';


const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You & ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography varient="h6">{post.name}</Typography>
                <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openPost} >
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) =>`#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h6" gutterBottom>
                {/* <Link href={post.message} target="_blank" className={classes.link_default}>{post.title}</Link> */}
                {post.title}
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* <Link href={post.message} color="textSecondary" target="_blank" className={classes.link_default}>{post.message}</Link> */}
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button color='primary' size="small" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button color='primary' size="small" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
                
            </CardActions> 
        </Card>
    ) 
}

export default Post
