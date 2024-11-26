let instance;

class UrlShortener{
    constructor({
        redisConfig
    }){
        if (instance) {
            return instance;
          }
          this.storage = redisClient(redisConfig)      

        instance = this;
    }
}
