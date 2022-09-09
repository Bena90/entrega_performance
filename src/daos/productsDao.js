import ContainerMongo from "../containers/ContainerMongo.js";
import productSchema from '../models/ProductSchema.js'

class ProductDaoMongo extends ContainerMongo {
    constructor(){
        super("Product", productSchema);
    }
}

export default ProductDaoMongo;