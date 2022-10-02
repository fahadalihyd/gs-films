import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Auth from './Routes/Auth.js';
import Film from './Routes/Film.js';
import Comment from './Routes/Comment.js';
import errorLogger , {routeErrorHandle, notFoundHandler} from './Middleware/RouteHandel.js'
import authenticateToken from "./Middleware/AuthenticateToken.js";


const app = express();
dotenv.config();

const _PORT = process.env.PORT || 8001; 
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({extended:true }));
app.use(cors());


// Routes
app.use('/auth' , Auth);
app.use('/film' , Film);
app.use('/comment' , Comment);

app.use(authenticateToken);

// Access to public DIR
app.use(express.static('./public'));


// Middleware
app.use(errorLogger);
app.use(routeErrorHandle);
app.use(notFoundHandler);

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(_PORT , () => {
        console.log("SERVER RUNNING");
        console.log("App is running on "._PORT);
    });
}).catch((e) => {
    console.log(e);
    console.log("ERROR ON DB CONNECTION");
})