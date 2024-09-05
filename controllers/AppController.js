import redisClient from '../utils/redis'; // Import Redis client
import dbClient from '../utils/db'; // Import DB client

class AppController {
  // Get the status of Redis and DB
  static async getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).json(status);
  }

  // Get statistics about users and files
  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      const stats = {
        users,
        files,
      };
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
