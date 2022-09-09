import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

dotenv.config();

const connectionString =  process.env.MONGO_URL

const args = yargs (hideBin(process.argv))
    .default({
        port: 8080,
        mode: 'fork'
    })
    .argv



export default {
    args,
    connectionString,
    node_env: process.env.NODE_ENV.toLowerCase()
}









