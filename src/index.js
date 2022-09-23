import express from 'express';
import config from './config/config.js';
import path from 'path'
import cors from "cors"
import compression from 'compression';
import { fileURLToPath } from 'url';
import logger from './logs/logger.js'
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import initializePassport from './strategies/userStrategies.js'

// Router import:
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import indexRouter from './routes/indexRouter.js';
import authRouter from './routes/authRouter.js'

const app = express();
const PORT = config.args.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Cookies / Session
app.use (cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:
            process.env.MONGO_URL,
        mongoStoreOptions,
    }),
    secret: process.env.SESSIONSECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 120000
    },
    rolling: true
}))

app.use(cors())
app.use (express.static(path.join(__dirname, "public")))
app.use (express.urlencoded({ extended: true }));
app.use (express.json());
app.use (compression())
app.use (passport.initialize())
app.use (passport.session())
initializePassport(passport)

// all routes
app.use((req, res, next)=>{
    logger.info(`New request: ${req.method} - ${req.path}`)
    next()
})

// main routes
app.use("/", indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/auth", authRouter);


// route not implemented
app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.status(404).json({error404: `Ruta ${method} ${url} no está implementada`});
  });

// error handler
app.use(function (err, req, res, next) {
    logger.error("Error: ", err)
    res.status(500).json({
        error: err.message,
        });
    });

app.listen(PORT, ()=> {
    console.log (`server run on port ${PORT}`);
})