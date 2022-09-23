import passportLocal from 'passport-local';
import User from '../models/UserSchema.js';
import {hashPassword, isValidPassword} from '../utils/hashPassword.js';


const LocalStrategy = passportLocal.Strategy;

const initialize = (passport) => {
    const registerStrategy = new LocalStrategy(
        {passReqToCallback: true }, 
        async ( req, username, password, done ) => {
            const {email} = req.body
            try {
                const existingUser = await User.findOne({ username });
                const existingEmail = await User.findOne({ email });
    
                if ( existingUser || existingEmail ) {
                    return done ('User/Email already exists',null);
                }
        
                const newUser = {
                    username,
                    password: hashPassword(password),
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                };
    
                const createdUser = await User.create(newUser);
    
                console.log(newUser, createdUser)
    
                return done(null, createdUser, { status: "ok", message: "Usuario registrado exitosamente" })
    
            } catch (error) {
                console.log('Something went wrong', error)
                done('Something went wrong', null)
            }
        });
    
    const loginStrategy = new LocalStrategy (
        { passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await User.findOne({username});
                if ( !user || !isValidPassword(password, user.password)){
                    return done('Invalid credentials', null);
                }
                req.session.user = {username: user.username, email: user.email};
                done(null, user, { status: 'ok' })
                
            } catch (error) {
                console.log('Something went wrong', error)
                done(null, null, { error: true, message: "error login" })
            }
    });

    passport.use('register', registerStrategy)
    passport.use('login', loginStrategy)

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done).then(user=>{
            done(null, user)
        }).catch(err=>{
            done(err, null)
        });
    });

}

export default initialize
