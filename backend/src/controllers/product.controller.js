import { uploadFile } from "../services/storage.service.js";
import Product from './../models/product.model.js';

export const createProduct = async (req, res) => {
    const { title, description, price, sizes } = req.body;

    const fileUrls = [];
    for (let i = 0; i < req.files.length; i++) {
        const response = await uploadFile({
            buffer: req.files[i].buffer,
            filename: req.files[i].originalname
        })
        fileUrls.push(response.url)
    }

    const product = await Product.create({
        title,
        description,
        price: {
            amount: price.amount,
            currency: price.currency
        },
        sizes,
        images: fileUrls,
        seller: req.user.userId
    })

    return res.status(201).json({
        message: "Product created successfully",
        data: {
            product
        }
    })

}


export const listAllProducts = async (req, res) => {
    const products = await Product.find();

    return res.status(200).json({
        message: "Products data fetched successfully",
        data: {
            products
        }
    })
}