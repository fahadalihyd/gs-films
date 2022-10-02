import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type:String,
        required: true,
    },
    comment_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    film:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Films"
    },
    created_at:{
        type:Date,
        default: new Date()
    }
});


const Comment = mongoose.model('Comments' , commentSchema);

export default Comment;