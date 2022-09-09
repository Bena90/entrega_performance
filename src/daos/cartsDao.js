import ContainerMongo from "../containers/ContainerMongo.js";
import cartSchema from '../models/CartSchema.js'

class CartDaoMongo extends ContainerMongo {
    constructor(){
        super("Cart", cartSchema);
    }
}

export default CartDaoMongo;