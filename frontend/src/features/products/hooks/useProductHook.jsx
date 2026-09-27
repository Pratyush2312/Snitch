import { useCallback, useEffect, useState } from "react";
import api from "../../../api/api";

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
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { products, loading, error, refetch: getProducts };
};

export default useProductHook;
