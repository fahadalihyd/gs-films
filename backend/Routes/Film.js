import express from "express";
import multer from "multer";
import validateResourceYup from "../Middleware/Validator.js";
import filmSchema from "../Validate/FilmValidate.js";
import { success , error, slug } from "../Helpers/index.js";
import Film from "../Models/Film.js";
import authenticateToken from "../Middleware/AuthenticateToken.js";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  var upload = multer({ storage: storage })

const router = express.Router();

router.get('/' , async (req,res) => {
        let search = req.query?.search;
        let films = {};
        if (req.query.search) {
             films = await Film.find( { $or:[
                {"title" :  {$regex : search , $options:'i'}},
               {"description" :  {$regex : search , $options:'i'}}
            ]   
        }).populate('created_by');
        }else{
             films = await Film.find().populate('created_by');
        }
        res.status(200).json(success("Available Films!" , films));
});

router.get('/:slug' , async (req,res , next) => {
    try {
        const {slug} = req.params;  
        const singleFilm = await Film.findOne({slug:slug});
        res.status(200).json(success("Available Film!" , singleFilm) );
    } catch (error) {
        next(error);
    }
});
// router.get('/:id' , async (req,res , next) => {
//     try {
//         const {id} = req.params;  
//         const singleFilm = await Film.findById(id);
//         res.status(200).json(success("Available Film!" , singleFilm) );
//     } catch (error) {
//         next(error);
//     }
// });


router.put('/:id' , authenticateToken , upload.single('photo') , validateResourceYup(filmSchema) , async (req,res , next) => {
    const film = req.body;
    req.file ? film.photo = 'uploads/'+req.file.filename : "";
    film.slug = slug(film.name);
    const {id} = req.params;
    try {
        const updatedFilm = await Film.updateOne({_id:id} , film);
        const getFilm = await Film.findById(id);
        res.status(200).json(success("Film updated successfully!" , getFilm));
    } catch (error) { 
        next(error);
    }
});
router.delete('/:id' , authenticateToken , async (req,res, next) => {
    const {id} = req.params;
    try {
        const deletedFilm = await Film.deleteOne({_id:id});
        res.status(200).json(success("Deleted Successfully" ,  deletedFilm));
    } catch (error) {
        next(error);
    }
});



router.post('/create' ,  authenticateToken , upload.single('photo') , validateResourceYup(filmSchema)   , async (req,res , next) => {
    const film = req.body;
    req.file ? film.photo = 'uploads/'+req.file.filename : "";
    film.slug = slug(film.name);
    film.created_by = req.user._id;
    try {
        const   newFilm = await Film(film).save();
        res.status(200).json(newFilm);
    } catch (error) {
        next(error);
    }
});

export default router;