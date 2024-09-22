import { getSession } from "../services/SessionService.js";

async function isAuthenticated(req, response, next){
    console.log("isAuthenticated");
    console.log(req.cookies);
    try 
    {
        const userUid = req.cookies.sessionId;
    if(!userUid){
        console.log("no user uid");
        return response.status(401).json({message: "Unauthorized"});
    }
    const user = getSession(userUid);
    if(!user){
        console.log("no user");
        return response.status(401).json({message: "Unauthorized"});
    }
    req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({message: "Internal server error"});
    }
}

export {isAuthenticated};