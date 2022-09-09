import Router from 'express'
import checkAuth from '../middleware/checkAuth.js';
import { 
    createCart,
    getCarts,
    deleteCart,
    getCartProducts,
    addProductInCart,
    deleteProductInCart
} from '../controllers/cartsControllers.js'

const router = Router();

router.route ('/')
    .post(checkAuth, createCart) // Create a new Cart
    .get(checkAuth, getCarts) // Get list of carts

router.delete('/:id', checkAuth, deleteCart) // Delete a cart

router.route('/:id/products')
    .get(checkAuth, getCartProducts) // Get products from a cart by id

router.route('/:id/products/:id_prod')
    .post(checkAuth, addProductInCart) // Add products to a select cart
    .delete (checkAuth, deleteProductInCart) // Delete product in a select cart


export default router;