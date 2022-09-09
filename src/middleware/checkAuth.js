import logger from '../logs/logger.js'

const checkAuth = async (req, res, next) => {
    if (!process.env.ADMIN){
        const error = new Error('Unauthorized');
        logger.warn(`New request: ${req.method} - ${req.path}`)
        return res.status(401).json({msg: error.message});
    }
    next();
}

export const auth = async (req, res, next) => {
    if (req.isAuthenticated() || req.session.user) {
        next();
    } else {
        const error = new Error('Unauthorized');
        res.status(401).json({msg: error.message});
    }
}

export default checkAuth;