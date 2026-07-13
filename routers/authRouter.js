const {Router} = require("express")
const authController = require("../controllers/authController")
const jwtController = require("../controllers/jwtController.js")
const {registerValidations, loginValidations} = require("../controllers/validations/authValidation.js")

const authRouter = Router();

authRouter.post('/register', registerValidations, authController.register)
authRouter.post('/login', loginValidations, authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/me', jwtController.authenticated, authController.getUser)

module.exports = authRouter