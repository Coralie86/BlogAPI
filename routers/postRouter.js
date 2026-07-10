const {Router} = require("express")
const postController = require("../controllers/postController.js")
const jwtController = require("../controllers/jwtController.js")

const postRouter = Router();

postRouter.get('/', jwtController.authOptional, postController.getPosts) //anyone can see the posts published
postRouter.post('/', jwtController.authenticated, postController.newPost) //only admin

postRouter.get('/:postId', jwtController.authOptional, postController.getPostById) // anyone can see details of posts published
postRouter.put('/:postId', jwtController.authenticated, postController.editPost) // only admin
postRouter.delete('/:postId', jwtController.authenticated, postController.deletePost) //only admin

postRouter.get('/:postId/comments', jwtController.authOptional, postController.getPostComments) //anyone can see the comments of posts published
postRouter.post('/:postId/comments', jwtController.authenticated, postController.newPostComment) // only authenticated people

module.exports = postRouter;