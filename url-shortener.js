import createRedisConnection from './config/redis.js'
import crypto from "crypto"

class UrlShortener{
    static instance;
    constructor({
        redisConfig,
        ttl,
        length
    }){
        if (UrlShortener.instance) {
            return UrlShortener.instance;
          }
          this.storage = createRedisConnection(redisConfig);
          this.ttl = ttl;
          this.length = length;
          UrlShortener.instance = this;
    }

    async generateShortUrl(originalURL){
        const buffer = crypto.randomBytes(this.length);
        const shortenedURL = buffer.toString('base64').replace(/\//g, '_').replace(/\+/g, '-').slice(0, this.length); 
        await this.storage.set(shortenedURL, originalURL, 'EX', this.ttl);
        return shortenedURL;
    }
    async getOriginalUrl(shortenedURL){
        const pathName = await this.storage.get(shortenedURL);
        if (!pathName) {
            throw new Error('Shortened URL not found');
        }
        return pathName; 
    }
}
export default UrlShortener;
