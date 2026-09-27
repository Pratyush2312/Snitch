import Product from "../models/product.model.js";


export const authenticateSeller = (req, res, next) => {
    const { role } = req.user;

    if (role !== "seller") {
        return res.status(403).json({
            message: "Forbidden! Only sellers are allowed"
        });
    }

    next();
};


export const authorizeSeller = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (product.seller.toString() !== userId) {
        return res.status(403).json({
            message: "Forbidden! You are not authorized to modify this product"
        });
    }

    next();
};