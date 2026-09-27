import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL"]
            }
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;