import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        email:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    created_at:{
        type:Date,
        default: new Date()
    }
});


const User = mongoose.model('Users' , userSchema);

export default User;