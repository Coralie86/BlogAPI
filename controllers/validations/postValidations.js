const {body} = require("express-validator");

const postValidations = [
    body('title')
    .isLength({min: 5}).withMessage("Please enter at least 5 characters for Title."),
    body('description')
    .notEmpty().withMessage("Please enter a description.")
]


module.exports = {postValidations}