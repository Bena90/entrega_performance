import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,        
    },
    code: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    stock: {
        type: Number,
        trim: true,
        required: true,
    }
},
{
    timestamps: true,
}
)

export default productSchema;