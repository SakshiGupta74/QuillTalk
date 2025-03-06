import express from 'express';
const router = express.Router();

import { loginvalidation, signupvalidation } from '../middlewares/AuthValidation.js';
import { signup,login } from '../controllers/AuthController.js';



router.post('/signup', signupvalidation, signup);
router.post('/login',loginvalidation, login);

export default router;
