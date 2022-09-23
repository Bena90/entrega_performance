
import {Router} from 'express'
import passport from 'passport';

const router = Router();

router.get('/', async (req, res)=> {
    res.json({username: req.session.user, admin: req.session.admin})
})

/*router.post('/login', async (req, res)=> {
    const {user} = req.body;

    if (user){
        req.session.user = user;
        req.session.admin = true;

        return res.json ({user: req.session.user, admin: req.session.admin})
    }
    res.json({admin: false})
})*/

//router.post('/register', passport.authenticate('register', {failureRedirect: '/error'}), registerUser);
    
//router.post('/login', passport.authenticate('login', {failureRedirect: '/error'}), authenticateUser)

router.post("/login", (req, res) => {
    passport.authenticate('login', (err, user, info) => {
        res.json(user)
    })(req, res)
})

router.post("/register", (req, res) => {
    passport.authenticate('register', (err, user, info) => {

        res.json(info)
    })(req, res)
})

router.get('/logout', async (req, res)=> {
    const message = req.session.user ? `Hasta luego ${req.session.user}` : 'Hasta luego';
    console.log(req.session.user)
    req.session.destroy((err) => {
        if (!err){
            return res.json({admin: false})
        }
        res.status(500).json({ error: err });
    })

})


export default router;