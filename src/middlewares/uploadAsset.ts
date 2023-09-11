import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = "./upload";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = uuidv4();
    callback(null, uniqueSuffix + fileExtension);
  },
});

// Create an instance of multer
export const upload = multer({ storage: storage });
