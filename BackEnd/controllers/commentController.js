const jwtController = require("./jwtController.js")
const db = require("../service/queries.js");
const { validationResult } = require("express-validator");

exports.editComment = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const user = req.user;
    if(!user || !user.isadmin){
        return res.status(401).json({errors: [{msg: "Only Admin can performed that action"}]})
    }
    const commentId = parseInt(req.params.commentId);
    if (!commentId){
        return res.status(400).json({errors: [{msg: "No comment Id."}]})
    }
    const newComment = req.body;
    if (!newComment){
        return res.status(400).json({errors: [{msg: "Insert a description."}]})
    }
    try {
        await db.updateComment(commentId, newComment);
        res.status(200).json({message:"Comment has been successfully updated."})
    } catch(err){
        next(err)
    }
}

exports.deleteComment = async (req, res, next) => {
    const user = req.user;
    if(!user || !user.isadmin){
        return res.status(401).json({message: "Only Admin can performed that action"});
    }
    const commentId = parseInt(req.params.commentId);
    if(!commentId){
        return res.status(400).json({message: "No comment id."});
    }
    try {
        await db.deleteComment(commentId);
        res.status(200).json({message: "Comment has been deleted successfully"})
    } catch(err){
        next(err);
    }
}