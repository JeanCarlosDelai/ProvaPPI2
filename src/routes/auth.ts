import express from 'express'
import authenticateUser from '../middleware/authentication'
import rateLimiter from 'express-rate-limit'
import { register, login, updateUser } from '../controllers/auth'

const router = express.Router();

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Muitas requisições deste IP, Por Favor aguarde 15 min',
    },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateUser', apiLimiter, authenticateUser, updateUser);
export default router

