
const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
}

exports.authenticated = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Malformed token"});
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({message: 'Invalid or expired Token'})
    };   
}




exports.authOptional = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        req.user = null;
        return next();
    }

    const token = authHeader.split(' ')[1];
    console.log(token === null)
    if(token === 'null'){
        req.user = null;
        return next();
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({message: 'Invalid or expired Token'})
    };
}