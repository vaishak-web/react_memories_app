import PostMessage from "../models/postMessage.js"
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1);
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(error){
        res.status(404),json({message:error.message});
    }
};

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags} = req.query;

    try{
        const title = new RegExp(searchQuery, 'i');
        // find post having title or tags( tags in the input which is comma seperated) 
        const posts = await PostMessage.find({ $or: [{title}, {tags:{ $in: tags.split(',')}}]});

        res.json({data: posts});
    }catch(error){
        res.status(404),json({message:error.message});
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(409),json({message:error.message});
    }

};

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatePost);
};

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await PostMessage.findByIdAndDelete(id);

    res.json({message: `post deleted successfully`});
};

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatePost);

};