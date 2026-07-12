const prisma = require("../lib/prisma.js")

async function getAllPosts() {
    const postsList = await prisma.post.findMany();
    
    if(!postsList){
        const err = new Error("List is undefined")
        err.status = 500;
        throw err;
    }
    return postsList
}

async function getPublishedPosts() {
    const postsList = await prisma.post.findMany({
            where: {
                ispublished: true,
            }
        });
        
    if(!postsList){
        const err = new Error("List is undefined")
        err.status = 500;
        throw err;
    }
    return postsList
}

async function createPost(post){
    await prisma.post.create({
        data: {
            title: post.title,
            description: post.description,
        }
    })
}

async function getPostById(postId){
    if(typeof(postId) !== "number"){
        const err = new Error("postId should be Integer.");
        err.status = 500;
        throw err; 
    }

    const postData = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if(!postData){
        const err = new Error("No post found for that Id.");
        err.status = 500;
        throw err;
    }

    return postData;
}

async function editPost(id, postData){
    if(typeof(id) !== "number" || !postData){
        const err = new Error("id is not a number.")
        err.status(500);
        throw(err)
    }

    const postEdited = await prisma.post.update({
        data: {
            title: postData.title,
            description: postData.description,
        },
        where: {
            id: id,
        }
    })
    if(!postEdited){
        const err = new Error("Update not well performed.");
        err.status(500);
        throw err
    }

    return postEdited;
}

async function deletePost(postId) {
    if(typeof(postId) !== "number"){
        const err = new Error("Id is not a number.")
        err.status(500);
        throw err;
    }
    await prisma.comment.deleteMany({
        where: {
            postId: postId,
        }
    })
    await prisma.post.delete({
        where: {
            id: postId,
        }
    })
}

async function getPostComments(postId) {
    if(typeof(postId) !== "number"){
        const err = new Error("Id is not a number.")
        err.status(500);
        throw err;
    }

    const commentList = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            author: true,
        }
    });
    if(!commentList){
        const err = new Error("List is undefined.")
        err.status(500);
        throw err;
    }
    return commentList;
}

async function createComment(postid, authorId, commentData){
    if(typeof(postid) !== "number"){
        const err = new Error("Id is not a number.")
        err.status(500);
        throw err;
    }
    const newComment = await prisma.comment.create({
        data: {
            description: commentData.description,
            authorId: authorId.id,
            postId: postid,
        }
    })

    return newComment
}

async function updateComment(commentId, newComment){
    if(typeof(commentId) !== "number"){
        const err = new Error("CommentId is not a number.")
    }
    await prisma.comment.update({
        where:{
            id: commentId,
        },
        data: {
            description: newComment.description,
        }
    })
}

async function deleteComment(commentId){
    if(typeof(commentId) !== "number"){
        const err = new Error("Comment Id is not a number.")
        err.status(500)
        throw err;
    }
    await prisma.comment.delete({
        where:{
            id: commentId,
        }
    })
}

module.exports = {getAllPosts, getPublishedPosts, createPost, getPostById, editPost, deletePost, getPostComments,createComment,
    updateComment, deleteComment
}