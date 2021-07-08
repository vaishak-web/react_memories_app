import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    titile: String,
    message: String,
    creator: String,
    tags:[String],
    seletedFile: String,
    likeCount:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;