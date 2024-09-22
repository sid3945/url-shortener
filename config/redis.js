import {createClient} from "redis";

const redisClient = createClient();

async function connectRedis(){
    await redisClient.connect();
}
export {redisClient, connectRedis};