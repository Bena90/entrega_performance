import os from 'os'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


const args = yargs(hideBin(process.argv))

export const getSystemInfo = (req, res) => {

    const info = {
        args,
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage(),
        path: process.execPath,
        pid: process.pid,
        folder: process.cwd(),
        cpus: os.cpus().length,
    }
    res.json(info);
}

export const getSystemInfoLog = (req, res) => {

    const info = {
        args,
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage(),
        path: process.execPath,
        pid: process.pid,
        folder: process.cwd(),
        cpus: os.cpus().length,
    }
    console.log(info)
    res.json(info);
}