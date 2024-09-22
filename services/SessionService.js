const userSession = new Map();

function createSession(userId, sessionId){
    userSession.set(userId, sessionId);
}

function getSession(userId){
    return userSession.get(userId);
}

export {createSession, getSession};