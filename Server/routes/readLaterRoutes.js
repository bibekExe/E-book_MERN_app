import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addReadLater } from '../controllers/readLaterControllers.js';

const readLaterRouter = express.Router();

readLaterRouter.put('/add-resource-to-read-later', userAuth, addReadLater)



export default readLaterRouter;