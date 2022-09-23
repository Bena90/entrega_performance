import {Router} from 'express';
const router = Router();

router.get('/', async (req, res)=> {
    res.json({username: req.session.user, admin: req.session.admin})
})

//router.post('/register', passport.authenticate('register', {failureRedirect: '/error'}), registerUser);
    
//router.post('/login', passport.authenticate('login', {failureRedirect: '/error'}), authenticateUser)

router.post("/login", (req, res) => {
    passport.authenticate('login', (err, user, info) => {
        res.json(info)
    })(req, res)
})

router.post("/register", (req, res) => {
    passport.authenticate('register', (err, user, info) => {
        console.log(info)
        res.json(info)
    })(req, res)
})

export default router;



