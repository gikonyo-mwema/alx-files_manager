import { Router } from 'express';
import AppController from '../controllers/AppController.js';

const router = Router();

// Define the /status route
router.get('/status', AppController.getStatus);

// Define the /stats route
router.get('/stats', AppController.getStats);

export default router;

