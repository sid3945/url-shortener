const userSession = new Map();

function createSession(userId, sessionId){
    console.log("createSession", userId, sessionId);
    userSession.set(userId, sessionId);
}

function getSession(userId){
    console.log("getSession", userId);
    console.log(userSession);
    return userSession.get(userId);
}

export {createSession, getSession};