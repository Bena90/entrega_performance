import * as fs from 'fs';
const fsp = fs.promises;

const readDB = async(file) => {
    const utf = 'utf-8';
    let database = await fsp.readFile(file, utf);
    if (database == ""){
        database = "[]";
    }
    return JSON.parse(database);
}

export default readDB;