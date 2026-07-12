const {Router} = require("express")
const authController = require("../controllers/authController")
const jwtController = require("../controllers/jwtController.js")

const authRouter = Router();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/me', jwtController.authenticated, authController.getUser)

module.exports = authRouter