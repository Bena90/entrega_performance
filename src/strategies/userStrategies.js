import passportLocal from 'passport-local';
import User from '../models/UserSchema.js';
import {hashPassword, isValidPassword} from '../utils/hashPassword.js';

const LocalStrategy = passportLocal.Strategy;

export const registerStrategy = new LocalStrategy(
    {passReqToCallback: true }, 
    async ( req, username, password, done ) => {
        try {
            const existingUser = await User.findOne({ username });

            if ( existingUser ) {
                return done ('User already exists',null);
            }
    
            const newUser = {
                username,
                password: hashPassword(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };

            console.log(newUser)
    
            const createdUser = await User.create(newUser);
            done(null, createdUser);

        } catch (error) {
            console.log('Something went wrong', error)
            done('Something went wrong', null)
        }
    });

export const loginStrategy = new LocalStrategy (
    async (username, password, done) => {
        try {
            const user = await User.findOne({username});
            
            if ( !user || !isValidPassword(password, user.password)){
                return done('Invalid credentials', null);
            }
            done(null, user)
            
        } catch (error) {
            console.log('Something went wrong', error)
            done('Something went wrong', null)
        }
});

