import multer from "multer";
import md5 from "md5";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, md5(file.originalname) + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage
});
