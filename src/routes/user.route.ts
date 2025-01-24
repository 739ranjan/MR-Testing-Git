import express from 'express';
import { updateUserProfile, uploadImage } from '../controllers/user.controller';
import imageUploadMiddleware from '../middlewares/multer.middleware';

const userRouter = express.Router();

userRouter.put('/upload-image', imageUploadMiddleware, uploadImage);
userRouter.put('/update-profile', updateUserProfile);

export default userRouter;