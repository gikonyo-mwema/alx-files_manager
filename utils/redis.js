import redis from 'redis';

class RedisClient {
    constructor() {
        // Create a Redis client
        this.client = redis.createClient();

        // Handle any errors with the Redis client
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        // Log when connected
        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    // Check if the Redis connection is alive
    isAlive() {
        return this.client.connected; // Returns true if connected
    }

    // Asynchronously get a value from Redis by key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    // Asynchronously set a value in Redis with expiration
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    // Asynchronously delete a value from Redis by key
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
