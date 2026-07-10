const prisma = require("../lib/prisma.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtController = require("./jwtController.js")

exports.register = async (req, res) => {
    const newUser = req.body;

    if(!newUser.username || !newUser.email || !newUser.password) {
        return res.status(400).json({message: "Missing required field."})
    }

    try {
        await prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: await bcrypt.hash(newUser.password, 10),
            }
        });
        res.status(200).json({message: "User added"})
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal server error"})     
    }     
}

exports.login = async (req,res) => {
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
            return res.status(401).json({ message: "email does not exist."})
        }
        const match = await bcrypt.compare(userLogged.password, user.password)
        if(!match){
            return res.status(401).json({ message: "Wrong password."});
        }
        const token = jwtController.generateToken(user);
        return res.status(200).json({ message: "Loggin successful", token, isadmin: user.isadmin});
    } catch(err) {
        return res.status(500).json({error:err.message})
    }
}

exports.logout = async (req,res) => {
    req.user = null;
    return res.status(200).json({message: "Logout Successful."})

}