import ProductDao from '../daos/productsDao.js';
import CartDao from '../daos/cartsDao.js'

const cart = new CartDao();
const product = new ProductDao();

// Get list of carts -------------------------------
export const getCarts = async (req, res) =>{
    const carts = await cart.readObjects();
    return res.status(200).json({carts});
}

// Get products from a cart -------------------------------
export const getCartProducts = async(req, res) =>{
    const { id } = req.params;

    const selectCart = await cart.readObject(id)

    if(!selectCart){
        res.status(404).json({error: 'Cart not found'});
    };

    res.status(200).json(selectCart.products)
}

// Create a new Cart -------------------------------
export const createCart = async(req, res) =>{
    let {products} = req.body

    if(!products) {
        products = []
    }

    try {
        const newCart = await cart.createObject({products});
        console.log(newCart)
        res.status(200).json(newCart);
    } catch (error) {
        console.log(error);
    }
}

// Add product with its ID to a selected cart -------------------------------
export const addProductInCart = async (req, res) =>{
    const { id, id_prod } = req.params;

    const selectCart = await cart.readObject(id);

    if(!selectCart){
        return res.status(404).json({msg: 'Cart not found!'})
    }

    const selectProduct = await product.readObject(id_prod);

    if(!selectProduct){
        return res.status(404).json({msg: 'Product not found!'})
    }

    const checkCart = selectCart.products.some(product => product._id.toString() === selectProduct._id.toString())
    if (checkCart){
        return res.status(404).json({msg: 'Product already exists!'})
    }

    selectCart.products.push (selectProduct)
    const updatedCart = {products: selectCart.products}

    try {
        await cart.updateObject(updatedCart, selectCart._id)
        return res.status(200).json({msg: 'Product added successfully'})
    } catch (error) {
        console.log(error)
    }
}

// Delete a cart -------------------------------
export const deleteCart = async (req, res) =>{
    const { id } = req.params;

    try {
        await cart.removeObject(id);
        return res.status(200).json({msg: `Cart deleted successfully: ${id}`})
    } catch{
        console.log(error)
    }
}

// Delete product from a cart -------------------------------
export const deleteProductInCart = async (req, res) =>{
    const { id, id_prod } = req.params;

    const selectCart = await cart.readObject(id);

    const checkCart = selectCart.products.some(product => product._id.toString() === id_prod.toString())

    if (!checkCart){
        return res.status(404).json({msg: 'Product not found in the cart'})
    }

    const updateCart = selectCart.products.filter (product=> product._id.toString() !== id_prod.toString())

    selectCart.products = updateCart;
    const updatedCart = {products: selectCart.products};

    try {
        await cart.updateObject(updatedCart, id)
        return res.status(200).json({msg: `Product with id ${id_prod} deleted successfully`})
    } catch (error) {
        console.log(error)
    }
}