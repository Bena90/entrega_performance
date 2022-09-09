import * as fs from 'fs';
const fsp = fs.promises;

const writeDB = async (file, data) => {
    const utf = 'utf-8';
    await fsp.writeFile(file, JSON.stringify(data), utf);
}

export default writeDB;