import {error} from '../Helpers/index.js';

export const routeErrorHandle = ( err ,req , res , next) => {
    res.status(res.statusCode).json(error("Something went wrong" , err.statusCode , err.stack));
}
export const notFoundHandler = (req , res , next) => {
    res.status(404).json(error("Not found" , 404));
}

export default  ( err ,req , res , next) => {
    console.log("Error Logger Middleware!" , err);
    next(err);
}

