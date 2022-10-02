import jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET);
}


export default generateAccessToken;