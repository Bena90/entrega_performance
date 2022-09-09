import ProductDao from '../daos/productsDao.js';
import logger from '../logs/logger.js';

const product = new ProductDao();

// Actions --------------------------------->
export const getProducts = async (req, res) => {
    const products = await product.readObjects();
    return res.status(200).json({products});
}

export const addProduct = async (req, res) => {

    const newProduct = await product.createObject(req.body);
    res.status(200).json(newProduct);
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    if (id.length != 24){
        logger.error(`ID: ${id} incorrecto.`)
        return res.status(404).json({msg: `ID: ${id} incorrecto.`})
    }
    
    const productById = await product.readObject(id)
    if(!productById){
        return res.status(404).json({msg: 'Product not found'})
    }

    res.status(200).json(productById);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteById = await product.removeObject(id);
        if (!deleteById){
            return res.status(404).json({msg: 'Product not found!'})
        }
        return res.status(200).json(deleteById);
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params
    const updateProduct = req.body;
    const selectProduct = await product.readObject(id);

    if (!selectProduct) {
        return res.status(404).json({msg: 'Product not found'});
    }

    selectProduct.name  = updateProduct.name || selectProduct.name;
    selectProduct.description = updateProduct.description || selectProduct.description;
    selectProduct.code = updateProduct.code || selectProduct.code;
    selectProduct.photo = updateProduct.photo || selectProduct.photo;
    selectProduct.price = updateProduct.price || selectProduct.price;
    selectProduct.stock = updateProduct.stock || selectProduct.stock;

    try {
        await product.updateObject(selectProduct, id);
        return res.status(200).json(selectProduct);
    } catch (error) {
        console.log(error);
    }
}