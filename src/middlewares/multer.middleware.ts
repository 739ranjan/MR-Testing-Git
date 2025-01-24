import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";
import { Request, Response, NextFunction } from "express";

// Cloudinary Storage for Images
const cloudinaryStorage = new CloudinaryStorage({ cloudinary: cloudinary });

// Multer Middleware for Single Image Upload
const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}).single("image");

// Middleware Wrapper for Error Handling
const imageUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: `Error: ${err.message}\n, ${err}` });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    next();
  });
};

export default imageUploadMiddleware;

