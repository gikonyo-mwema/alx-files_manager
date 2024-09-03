import mongoose from 'mongoose';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}/${database}`;

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connection = mongoose.connection;

    // Handle connection errors
    this.connection.on('error', (err) => {
      console.error('MongoDB connection Error:', err);
    });

    this.connection.once('open', () => {
      console.log('Connected to MongoDB');
    });
  }

  // Check if the MongoDB connection is alive
  isAlive() {
    return this.connection.readyState === 1; // 1 means connected
  }

  // Asynchronously get the number of users
  static async nbUsers() {
    const User = mongoose.model('User', new mongoose.Schema({}));
    return User.countDocuments(); // Return the count of documents
  }

  // Asynchronously get the number of files
  static async nbFiles() {
    const File = mongoose.model('File', new mongoose.Schema({}));
    return File.countDocuments(); // Return the count of documents
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
