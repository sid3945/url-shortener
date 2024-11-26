import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import {redisClient} from "../config/redis.js";

async function generateShortUrl(req, res){
    console.log("req", req.body);
    const originalURL = req.body.url;
    console.log("originalURL", originalURL);
    try{
        const existingUrl = await Url.findOne({originalUrl: originalURL});
        if(existingUrl){
            await redisClient.set(originalURL, existingUrl, {EX: 3600});
            res.status(200).json(existingUrl);
        }
        else{
            const shortId = nanoid(8);
            const shortUrl = `${process.env.BASE_URL}/${shortId}`;
            const timeStamps = new Date();
            const newUrl = new Url({
                originalUrl: originalURL,
                shortId: shortId,
                timeStamps: timeStamps
            });
            await newUrl.save().then(()=>{}).catch((error)=>{
                console.error("error saving new url", error);
                res.status(500).json({error: "error saving new url"});
            });
            res.status(201).json(shortUrl);
        }
    } catch (error) {
        console.error("error generating short url", error);
    }
}

async function getOriginalUrl(req, res){
    const shortId = req.params.id;
    console.log("shortId", shortId);
    const existingUrlFromCache = await redisClient.get(shortId);
        if(existingUrlFromCache){
            console.log("existingUrlFromCache", existingUrlFromCache);
            res.status(200).json(existingUrlFromCache);
        }
}

export {generateShortUrl, getOriginalUrl};
