const prisma = require("../lib/prisma.js")
const jwtController = require("./jwtController.js")
const db = require("../service/queries.js")
const {validationResult} = require("express-validator")

exports.getPosts = async (req, res, next) => {
    const user = req.user;
    try {
        let postList = []
        if(!user || !user.isadmin) {
            postsList = await db.getPublishedPosts();
        } else {
            postsList = await db.getAllPosts();
        }        
        return res.status(200).json({postsList: postsList})
    } catch(err){
        next(err)
    }   
}

exports.newPost = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const user = req.user;
    if(!user || !user.isadmin) {
        return res.status(401).json({errors: [{msg: "Only Admin can performed that action"}]})
    }

    const newPost = req.body;
    if(!newPost){
        return res.status(400).json({errors: [{msg: "Please enter a title and description."}]})
    }
    try {
        await db.createPost(newPost);
        res.status(201).json(newPost)
    } catch(err){
        next(err);
    }
}

exports.getPostById = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    if(!postId){
        return res.status(404).json({message: "Select a Post."});
    }

    try {
        const postData = await db.getPostById(postId);
        res.status(200).json(postData);
    } catch(err){
        next(err)
    }
}

exports.editPost = async (req, res, next) => {
    const errors = validationResult(req);

    if(req.body.isPublished == undefined){
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
    }

    const user = req.user;
    if(!user || !user.isadmin) {
        return res.status(401).json({errors: [{msg: "Only Admin can performed that action"}]})
    }

    const postId = parseInt(req.params.postId);
    if(!postId){
        return res.status(404).json({errors: [{msg: "Select a Post."}]});
    }

    const newPost = req.body;
    if(!newPost){
        return res.status(400).json({errors: [{msg: "Insert a title and deccription or switch Publish."}]})
    }

    try {
        let postEdited = {};
        if(newPost.isPublished == undefined){
            postEdited = await db.editPost(postId, newPost);
        } else {
            postEdited = await db.publishPost(postId, newPost);
        }        
        res.status(200).json({post: postEdited, message: "Post has been successfully edited."});
    } catch(err){
        next(err)
    }
    
}

exports.deletePost = async (req, res, next) => {
    const user = req.user;
    if(!user || !user.isadmin){
        res.status(401).json({message: "Only Admin can perform that action"})
    }
    const postId = parseInt(req.params.postId);
    if(!postId){
        return res.status(404).json({message:"select a post"});
    }
    try {
        await db.deletePost(postId);
        res.status(200).json({message: "Post has been deleted successfully"});
    } catch(err) {
        next(err);
    }
}

exports.getPostComments = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    if(!postId){
        return res.status(404).json({message:"Select a Post"});
    }
    try {
        const postComments = await db.getPostComments(postId);
        res.status(200).json({postComments: postComments});
    } catch(err) {
        next(err)
    }
}

exports.newPostComment = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const user = req.user;
    if(!user){
        return res.status(401).json({errors: [{msg: "You need to be authenticated to perform that action."}]})
    }
    const postId = parseInt(req.params.postId);
    if(!postId){
        return res.status(404).json({errors: [{msg: "Select a Post"}]});
    }
    const commentData = req.body;
    if(!commentData){
        return res.status(400).json({errors: [{msg: "Insert a description."}]});
    }
    try {
        const newComment = await db.createComment(postId, user, commentData);
        res.status(200).json({message:"comment has been successfully added.", newComment: newComment});
    } catch(err) {
        next(err);
    }
}