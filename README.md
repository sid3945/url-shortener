# URL Shortener Package

A lightweight, efficient, and secure URL shortener built with Node.js and Redis. This package allows you to generate shortened URLs and retrieve the original URLs seamlessly. It uses cryptographically secure random string generation to avoid collisions, ensuring that each shortened URL is unique.

## Features

- **Random String Generation**: Uses `crypto.randomBytes` for cryptographically secure random string generation.
- **Redis Integration**: Stores URL mappings in Redis for fast retrieval and expiration handling.
- **TTL Support**: Set a custom time-to-live (TTL) for shortened URLs.
- **Singleton Pattern**: Ensures only one instance of the `UrlShortener` class is created for consistent configuration.
- **URL Validation**: Validates the original URL to ensure proper formatting.
- **URL-safe Encoding**: The shortened URL uses a base64 URL-safe encoding scheme.

## Installation

```npm install your-url-shortener-package```

## Usage

### Initialize the URL Shortener

First, import and initialize the UrlShortener class by passing in your Redis configuration, TTL (Time-to-live) for URL expiration, and the desired length of the shortened URL.

```
import UrlShortener from 'your-url-shortener-package';

const redisConfig = {
    host: 'localhost',
    port: 6379
}; // a simple connection string also works, if no redisConfig is provided default is localhost:6379

const ttl = 3600;  // URL expiration time in seconds (1 hour)
const length = 8;  // Length of the shortened URL

const urlShortener = new UrlShortener({ redisConfig, ttl, length });
```

### Generate a Shortened URL
To generate a shortened URL, pass the original URL to the generateShortUrl() method:

```
(async () => {
    const originalUrl = 'https://www.example.com/some/long/path';
    const shortUrl = await urlShortener.generateShortUrl(originalUrl);
    console.log('Shortened URL:', shortUrl);
})();
```
### Retrieve the original URL
```
(async () => {
    const originalUrlBack = await urlShortener.getOriginalUrl(shortUrl);
    console.log('Original URL:', originalUrlBack);
})();
```

## Contributing
Feel free to fork this repository and submit issues or pull requests for improvements!