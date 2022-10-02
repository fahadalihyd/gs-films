import express from "express";
import validateResourceYup from "../Middleware/Validator.js";
import userSchema, { userLoginSchema } from "../Validate/UserValidate.js";
import { success , error as custom_error} from "../Helpers/index.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../Helpers/GenerateToken.js";



const router = express.Router();


router.post('/register' , validateResourceYup(userSchema) , async (req,res, next) => {
    let userBody = req.body;
    bcrypt.hash(userBody.password , 10 , async (err ,hash) => {
            try {
                var user = await User(userBody).save();
                user.password = hash;
                user.save();
                let  jsonUser = user.toJSON();
                jsonUser.token = generateAccessToken(jsonUser);    
                res.status(200).json(success("Created User!" , jsonUser));
            } catch (error) {
                next(error);
            }
    });
});

router.post('/login' , validateResourceYup(userLoginSchema) , async (req,res, next) => {
    let userBody = req.body;
    try {
        let user = await User.findOne({email:userBody.email});
        bcrypt.compare(userBody.password , user.password , (err , match) => {
            let  jsonUser = user.toJSON();
            jsonUser.token = generateAccessToken(jsonUser);
            match == true ? res.status(200).json(success("login successfully!" , jsonUser)) : res.status(500).json(custom_error("Invalid Credentials!")) ;
        });
    } catch (error) {
        res.status(500).json(custom_error("Invalid Email!"));
    }
});





export default router;