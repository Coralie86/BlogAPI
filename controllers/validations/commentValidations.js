const {body} = require("express-validator");

const commentValidations = [
    body('description')
    .notEmpty().withMessage("Please enter a comment.")
]


module.exports = {commentValidations}