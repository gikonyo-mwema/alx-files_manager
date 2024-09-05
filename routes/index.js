import express from 'express';
import AppController from '../controllers/AppController'; // Import AppController
import UsersController from '../controllers/UsersController'; // Import UsersController
import AuthController from '../controllers/AuthController'; // Import AuthController
import FilesController from '../controllers/FilesController'; // Import FilesController

const router = express.Router();

// Define the routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew); // New endpoint for creating users
router.get('/connect', AuthController.getConnect); // New endpoint for connecting
router.get('/disconnect', AuthController.getDisconnect); // New endpoint for disconnecting
router.get('/users/me', UsersController.getMe); // New endpoint for retrieving user info
router.post('/files', FilesController.postUpload); // New endpoint for file uploads
router.get('/files/:id', FilesController.getShow); // New endpoint for retrieving a file by ID
router.get('/files', FilesController.getIndex); // New endpoint for retrieving files with pagination

export default router;
