import { Redis } from "ioredis";
let redisInstance = null;
function createRedisConnection(options) {
    if (!redisInstance) {
        redisInstance = new Redis(options); 
    }
    return redisInstance
}

export default createRedisConnection;