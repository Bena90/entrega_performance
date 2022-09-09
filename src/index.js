import express from 'express';
import config from './config/config.js';
import compression from 'compression';
import path from 'path'
import { fileURLToPath } from 'url';
import logger from './logs/logger.js'

// Router import:
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import indexRouter from './routes/indexRouter.js';

const app = express();
const PORT = config.args.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use (compression())
app.use (express.json());
app.use (express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

// all routes
app.use((req, res, next)=>{
    logger.info(`New request: ${req.method} - ${req.path}`)
    next()
})

// main routes
app.use("/", indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

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