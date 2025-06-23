import express from 'express';
import bcrypt from 'bcrypt';
import { signup,login } from '../controllers/authController.js'; 
import  User  from '../models/user.js'; 

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});


export default router;
