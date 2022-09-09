import Router from 'express'
import checkAuth from '../middleware/checkAuth.js';
import { 
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productsControllers.js'

const router = Router();

router.route ('/')
    .get(getProducts)
    .post(checkAuth, addProduct)

router.route('/:id')
    .get(checkAuth, getProduct)
    .put(checkAuth, updateProduct)
    .delete(checkAuth, deleteProduct);

export default router;