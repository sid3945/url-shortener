import { getSession } from "../services/SessionService.js";

async function isAuthenticated(req, response, next){
    const userUid = req.cookies.uid;
    if(!userUid){
        response.status(401).json({message: "Unauthorized"});
    }
    const user = getSession(userUid);
    if(!user){
        response.status(401).json({message: "Unauthorized"});
    }
    req.user = user;
    next();
}

export {isAuthenticated};