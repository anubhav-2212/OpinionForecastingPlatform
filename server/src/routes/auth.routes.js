import   express  from 'express';
import { login, logout, profile, register } from '../controller/auth.controller.js';
import  userMiddleware  from '../middlewares/auth.middlewares.js';


const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register',register );
authRoutes.get('/logout', userMiddleware, logout);
authRoutes.get('/profile', userMiddleware, profile);

export default authRoutes