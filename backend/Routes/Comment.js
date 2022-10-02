import express from "express";
import validateResourceYup from "../Middleware/Validator.js";
import { success , error as custom_error} from "../Helpers/index.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../Helpers/GenerateToken.js";
import { commentSchema } from "../Validate/FilmValidate.js";
import Comment from "../Models/Comment.js";
import authenticateToken from "../Middleware/AuthenticateToken.js";



const router = express.Router();


router.get('/:film_id' , async (req,res, next) => {
    try {
        let filmId = req.params.film_id;
        let comments = await Comment.find({film:filmId}).populate(['film' , 'comment_by']);
        res.status(200).json(success("Available Comments!" , comments));
    } catch (error) {
        next(error);
    }
});

router.post('/:film_id' , authenticateToken ,  validateResourceYup(commentSchema) , async (req,res, next) => {
    try {
        let commentBody = req.body;
        commentBody.film = req.params.film_id;
        commentBody.comment_by = req.user._id; 
        let comment = await Comment(commentBody).save()
        res.status(200).json(success("Comment Created!" , comment));
    } catch (error) {
        next(error);
    }
});






export default router;