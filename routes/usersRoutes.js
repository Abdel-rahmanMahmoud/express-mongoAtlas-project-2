import express from 'express';
import usersController from '../controllers/usersController.js';
import verifyToken from '../middleware/verifyToken.js';
import { loginValidation, registerValidation } from '../middleware/userValidation.js';
import multer from 'multer';
 import appError from '../utils/appError.js';

const route = express.Router();

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})

route.get('/', verifyToken , usersController.getAllUsers);
route.post('/register',upload.single('avatar'),registerValidation, usersController.register);
route.post('/login',loginValidation, usersController.login);

export default  route ;