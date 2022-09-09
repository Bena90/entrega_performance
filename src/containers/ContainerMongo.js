import mongoose from 'mongoose';
import config from '../config/config.js'
import logger from '../logs/logger.js'

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
                config.connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conectado: ${url}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

await connectDB();

class ContainerMongo {
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, schema)
    }
    
// CRUD Methods:
    // Create
        async createObject (obj){
            
            const object = new this.collection (obj);
            try {
                const saveObject = await object.save();
                logger.info(`Guadado exitoso, ${saveObject}`)
                return saveObject
            } catch (error) {
                return error
            }   
        }
        
    // Read
        async readObjects (){
            const objects = await this.collection.find();
            logger.info(`Busqueda de productos exitosa`)
            return objects                
        }

        async readObject (id){
            const object = await this.collection.findById(id);
            if (!object){
                logger.error(`Error de búsqueda, ID ${id} no encontrado`)
                return false
            }
            logger.info(`Elemento con ID ${id} encontrado`)
            return object;
        }

    // Update
        async updateObject (obj){
            try {
                const updateObject = await obj.save();
                logger.info(`Elemento con ID ${id} modificado.`)
                return updateObject;
            } catch (error) {
                logger.error(`Error al modificar elemento con ID ${id}.`)
                return {err: `Se produjo un error: ${error}`}
            }
        }

    // Remove
        async removeObject (id){
            const object = await this.collection.findById(id);

            if (!object){
                logger.error(`Error de búsqueda, ID ${id} no encontrado`)
                return false
            }

            try {
                await object.deleteOne();
                logger.info(`Elemento con ID ${id} borrado correctamente.`)
                
                return ({msg: 'Deleted successfully'})    
            } catch (error) {
                logger.error(`Error al eliminar ${id}:`, error)
                return {err: `Se produjo un error: ${error}`}           
            }
        };
}

export default ContainerMongo;