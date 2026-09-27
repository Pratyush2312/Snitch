import React, { useState } from "react";
import api from "../../../api/api";

const useCartHook = () => {

    const [cart, setCart] = useState([])
  const getCart = async () => {
    try {
      const res = await api.get("/cart");
        console.log(res.data.data.cart.products);
        setCart(res.data.data.cart.products);
    } catch (error) {}
    };


    return {
        getCart,
        cart
    }
};

export default useCartHook;
