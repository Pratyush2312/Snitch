import { useCallback, useEffect, useState } from "react";
import api from "../../../api/api";
import { toast } from "react-hot-toast";

const useProductHook = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/products");
      setProducts(res.data?.data?.products || []);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load products");
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productID, quantity, size) => { 
    try {
      const payload = {
        productID,
        quantity,
        size
      };
      const res = await api.post("/cart", payload);
      toast.success(res?.data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { products, loading, error, refetch: getProducts, addToCart };
};

export default useProductHook;
