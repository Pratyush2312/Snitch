import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/api";
import { toast } from "react-hot-toast";
const useSellerHook = () => {
  const [productsBySeller, setProductsBySeller] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      price: {
        currency: "INR",
      },
    },
  });

  const handleCreateProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sizes", JSON.stringify(data.sizes));
      formData.append("price", JSON.stringify(data.price));
      Array.from(data.images || []).forEach((file) => {
        formData.append("images", file);
      });
      const res = await api.post("/products", formData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getProductsBySeller = useCallback(async () => {
    try {
      const res = await api.get("/seller/products");
      setProductsBySeller(res.data.data.products);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    getProductsBySeller();
  }, [getProductsBySeller]);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);
      setProductsBySeller(res.data.data.products);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sizes", JSON.stringify(data.sizes));
      formData.append("price", JSON.stringify(data.price));

      Array.from(data.images || []).forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.put(`/products/${id}`, formData);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update product");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleCreateProduct,
    refetch: getProductsBySeller,
    productsBySeller,
    handleDeleteProduct,
    handleUpdateProduct,
    reset,
  };
};

export default useSellerHook;
