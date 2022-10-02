import mongoose from "mongoose";

const filmSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    slug: {
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    release_date:{
        type:Date,
        required: true
    },
    rating:{
        type:Number,
        required: true,
    },
    ticket_price:{
        type:Number,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    genres:{
        type:Array,
        default:[],
    },
    photo:{
        type:String,
        default:null,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    },
    created_at:{
        type:Date,
        default: new Date()
    }
});


const Film = mongoose.model('Films' , filmSchema);

export default Film;