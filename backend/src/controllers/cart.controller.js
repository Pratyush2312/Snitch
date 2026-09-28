
import Product from '../models/product.model.js';
import Cart from './../models/cart.model.js';

export const addToCart = async (req, res) => {
    const { productID, quantity, size } = req.body;

    const product = await Product.findById(productID);


    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    const selectedSize = product.sizes.find(s => s.size === size);

    if (!selectedSize) {
        return res.status(400).json({
            message: "Invalid Size"
        })
    }

    if (selectedSize.stock < quantity) {
        return res.status(400).json({
            message: "Insufficient Stock"
        })
    }

    const cart = (await Cart.findOne({ user: req.user.userId })) ?? await Cart.create({
        user: req.user.userId
    })

    const productInCart = cart.products.find(p => (p.product.toString() === productID) && (p.size === size));
    if (productInCart) {
        if ((productInCart.quantity + quantity) > selectedSize.stock) {
            return res.status(400).json({
                message: "Insufficient Stock"
            })
        }

        await Cart.findOneAndUpdate(
            {
                user: req.user.userId,
                "products.product": productID,
                "products.size": size
            },
            {
                $inc: {
                    "products.$.quantity": quantity
                }
            }
        )

        return res.status(200).json({
            message: "Product quantity updated"
        })
    }

    await Cart.findOneAndUpdate(
        { user: req.user.userId },
        {
            $push: {
                products: {
                    product: productID,
                    quantity,
                    size
                }
            }
        }
    );

    return res.status(201).json({
        message: "Product added to Cart"
    })

}

export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.user.userId
        }).populate("products.product");

        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId
            });
        }
        return res.status(200).json({
            message: "Cart retreived successfully",
            data: {
                cart
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const removeFromCart = async (req, res) => {
    console.log(req.body)
    const { productID, size } = req.body;
    const cart = await Cart.findOne({
        user: req.user.userId
    });

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    const productInCart = cart.products.find(
        item =>
            item.product.toString() === productID &&
            item.size === size
    );

    if (!productInCart) {
        return res.status(404).json({
            message: "Product not found in cart"
        });
    }

    await Cart.findOneAndUpdate(
        {
            user: req.user.userId
        },
        {
            $pull: {
                products: {
                    product: productID,
                    size: size
                }
            }
        }
    );



    return res.status(200).json({
        message: "Product removed from cart"
    });
};