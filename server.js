import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config(); // Load environment variables from the .env file

const app = express();
const port = process.env.PORT || 5000;

// Load all routes from routes/index.js
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

