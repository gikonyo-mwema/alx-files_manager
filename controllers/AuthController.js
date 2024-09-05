import crypto from 'crypto'; // For hashing passwords
import { v4 as uuidv4 } from 'uuid'; // For generating random tokens
import redisClient from '../utils/redis'; // Import Redis client
import User from './UsersController'; // Import User model

class AuthController {
  // Sign in the user
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;

    // Check for Basic Auth header
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode the Base64 encoded string
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    // Hash the password using SHA1
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Find the user by email and hashed password
    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate a random token
    const token = uuidv4();
    const key = `auth_${token}`;

    // Store the user ID in Redis for 24 hours
    await redisClient.set(key, user._id.toString(), 86400); // 86400 seconds = 24 hours

    // Return the token
    return res.status(200).json({ token });
  }

  // Sign out the user
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    // Check if the token exists in Redis
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the token in Redis
    await redisClient.del(key);
    return res.status(204).send(); // No content
  }
}

export default AuthController;
