import { nanoid } from "nanoid";
import Url from "../models/Url.js";

async function generateShortUrl(req, res){
    console.log("req", req.body);
    const originalURL = req.body.url;
    console.log("originalURL", originalURL);
    try{
        const existingUrl = await Url.findOne({originalUrl: originalURL});
        if(existingUrl){
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
    try{
        const url = await Url.findOne({shortId: shortId});
        if(url){
            console.log("url", url);
            console.log(url.originalUrl);
            res.status(200).json(url.originalUrl);
        }
    } catch (error){
        console.error("error getting original url", error);
        res.status(500).json({error: "error getting original url"});
    }
}

export {generateShortUrl, getOriginalUrl};