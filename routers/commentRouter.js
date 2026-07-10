const {Router} = require("express")
const commentController = require("../controllers/commentController.js")
const jwtController = require("../controllers/jwtController.js")

const commentRouter = Router();

commentRouter.put('/:commentId', jwtController.authenticated, commentController.editComment) //only admin
commentRouter.delete('/:commentId', jwtController.authenticated, commentController.deleteComment) //only admin

module.exports = commentRouter;