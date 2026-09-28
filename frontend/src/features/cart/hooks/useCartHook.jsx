import React, { useState } from "react";
import api from "../../../api/api";
import { toast } from "react-hot-toast";

const useCartHook = () => {
  const [cart, setCart] = useState([]);
  const getCart = async () => {
    try {
      const res = await api.get("/cart");
      console.log(res.data.data.cart.products);
      setCart(res.data.data.cart.products);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeFromCart = async (productID, size) => {
    try {
      const payload = {
        productID,
        size,
      };

      console.log(productID);

      const res = await api.delete("/cart", {
        data: payload,
      });

      toast.success(res.data.message);

      await getCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to remove item");
    }
  };

  return {
    getCart,
    cart,
    removeFromCart
  };
};

export default useCartHook;
