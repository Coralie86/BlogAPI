const prisma = require("../lib/prisma.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtController = require("./jwtController.js")
const {validationResult} = require("express-validator")
const sanitizeHTML = require("../utils/sanitizeHTML.js");

exports.wakeUp = async (req, res) => {
    return res.status(200).json({status: "ok"})
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const newUser = req.body;
    const newUserCleaned = {
        username: sanitizeHTML(newUser.username),
        email: sanitizeHTML(newUser.email),
        password: sanitizeHTML(newUser.password),
    }

    if(!newUserCleaned.username || !newUserCleaned.email || !newUserCleaned.password) {
        return res.status(400).json({errors: [{msg: "Missing required field."}]})
    }

    const existsUsername = await prisma.user.findMany({
        where: {
                username: newUserCleaned.username
            }
        })

    if(existsUsername.length > 0){
        return res.status(401).json({errors: [{msg: "Username already taken."}]})
    }

    const existsEmail = await prisma.user.findMany({
        where: {
                email: newUserCleaned.email
            }
        })

    if(existsEmail.length > 0){
        return res.status(401).json({errors: [{msg: "Email already taken."}]})
    }

    try {
        await prisma.user.create({
            data: {
                username: newUserCleaned.username,
                email: newUserCleaned.email,
                password: await bcrypt.hash(newUserCleaned.password, 10),
            }
        });
        res.status(200).json({message: "User added"})
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal server error"})     
    }     
}

exports.login = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const userLogged = req.body;

    if(!userLogged){
        return res.status(400).json({message: "Insert a valid username and password."})
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userLogged.email,
            }
        })
        if(!user){
            return res.status(401).json({ errors: [{msg: "email does not exist."}]})
        }
        const match = await bcrypt.compare(userLogged.password, user.password)
        if(!match){
            return res.status(401).json({ errors: [{msg: "Wrong password."}]});
        }
        const token = jwtController.generateToken(user, process.env.JWT_EXPIRESIN);
        return res.status(200).json({ message: "Loggin successful", token, isadmin: user.isadmin});
    } catch(err) {
        return res.status(500).json({error:err.message})
    }
}

exports.logout = async (req,res) => {
    req.user = null;
    return res.status(200).json({message: "Logout Successful."})

}

exports.getUser = async (req,res) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({message: "Not authenticated"})
    }
    try {
        return res.status(200).json({isadmin: req.user.isadmin})
    } catch(err) {
        return res.status(500).json({error: err.message})
    }
}