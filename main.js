require("dotenv").config();
const express = require("express")
const path = require("node:path");
const prisma = require("./lib/prisma.js");
const cors = require("cors");

const authRouter = require("./routers/authRouter.js")
const postRouter = require("./routers/postRouter.js")
const commentRouter = require("./routers/commentRouter.js")

const app= express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

// Set up views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up encoding
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set up PORT
const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Connected to Inventory app. Listening on port ${PORT}`)
})

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.use((err, req, res, next) => {
    console.log(err);
    if(err.status){
        return res.status(err.status).json({
            message: err.message,
        });
    }
    res.status(500).json({
        message: "Internal server error."
    });
});