import {Router} from 'express';
import { registerStrategy, loginStrategy } from '../strategies/userStrategies.js';
import {
    registerUser,
    authenticateUser,
    errorUser
} from '../controllers/userController.js';
import passport from 'passport';

const router = Router();

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)

router.get('/', async (req, res)=> {
    res.json({username: req.session.user, admin: req.session.admin})
})

router.get('/error', (req, res) => {
    console.log(' get ')
    res.json({message: 'get'})
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/error'}), registerUser);
    
router.post('/login', passport.authenticate('login', {failureRedirect: '/error'}), authenticateUser)

export default router;



