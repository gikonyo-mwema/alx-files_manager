import mongoose from 'mongoose';
import fs from 'fs'; // For file system operations
import path from 'path'; // For handling file paths
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
import redisClient from '../utils/redis'; // Import Redis client

// Define the File schema
const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['folder', 'file', 'image'] },
  isPublic: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, default: 0 },
  localPath: { type: String },
});

const File = mongoose.model('File', fileSchema);

class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name, type, parentId, isPublic = false, data,
    } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Validate parentId if provided
    if (parentId) {
      const parentFile = await File.findById(parentId);
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    // Handle folder creation
    if (type === 'folder') {
      const newFolder = new File({
        userId,
        name,
        type,
        isPublic,
        parentId: parentId || 0,
      });
      await newFolder.save();
      return res.status(201).json(newFolder);
    }

    // Handle file/image upload
    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
    const fileId = uuidv4();
    const filePath = path.join(folderPath, fileId);

    // Create directory if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Decode Base64 data and write to file
    const fileData = Buffer.from(data, 'base64');
    fs.writeFileSync(filePath, fileData);

    // Create a new file document in the database
    const newFile = new File({
      userId,
      name,
      type,
      isPublic,
      parentId: parentId || 0,
      localPath: filePath,
    });

    await newFile.save();

    return res.status(201).json(newFile);
  }

  // Retrieve a file by ID
  static async getShow(req, res) {
    const token = req.headers['x-token'];

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    // Find the file by ID and ensure it belongs to the user
    const file = await File.findOne({ _id: id, userId });
    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json(file);
  }

  // Retrieve all files with pagination
  static async getIndex(req, res) {
    const token = req.headers['x-token'];

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { parentId = 0, page = 0 } = req.query;

    // Pagination
    const limit = 20;
    const skip = page * limit;

    const files = await File.find({ userId, parentId }).limit(limit).skip(skip);
    return res.status(200).json(files);
  }
}

export default FilesController;
