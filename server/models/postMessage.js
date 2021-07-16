import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags:[String],
    selectedFile: String,
    likes:{
        type: [String],
        default: ["https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg"]
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;