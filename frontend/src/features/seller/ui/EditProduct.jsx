import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../../../shared/Navbar";
import useSellerHook from "../hooks/useSellerHook";
import api from "../../../api/api";

const productSizes = ["XS", "S", "M", "L", "XL"];

function EditProduct() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    handleUpdateProduct,
  } = useSellerHook();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        const product = res.data.data.product;

        reset({
          title: product.title,
          description: product.description,
          price: {
            amount: product.price?.amount,
            currency: product.price?.currency || "INR",
          },
          sizes: product.sizes?.map((item) => ({
            size: item.size,
            stock: item.stock,
          })),
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id, reset]);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/seller"
          className="text-sm font-semibold hover:text-[#d96f2b]">
          ← Back to dashboard
        </Link>

        <div className="bg-white border border-[#e4dfd8] rounded-3xl p-7 md:p-10 mt-7">
          <div>
            <p className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">
              Seller tools
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-3">
              Update your product information and stock.
            </p>
          </div>

          <form
            onSubmit={handleSubmit((data) => handleUpdateProduct(data, id))}
            className="flex flex-col gap-6 mt-8">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Title</label>

              <input
                type="text"
                className="border rounded-xl px-4 py-3 outline-none focus:border-black"
                placeholder="Product title"
                {...register("title", {
                  required: "Title is required",
                })}
              />

              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Description</label>

              <textarea
                rows="5"
                className="border rounded-xl px-4 py-3 outline-none focus:border-black resize-none"
                placeholder="Describe your product"
                {...register("description", {
                  required: "Description is required",
                })}
              />

              {errors.description && (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="grid sm:grid-cols-[1fr_140px] gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Price</label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="border rounded-xl px-4 py-3 outline-none focus:border-black"
                  {...register("price.amount", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                />

                {errors.price?.amount && (
                  <p className="text-sm text-red-600">
                    {errors.price.amount.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Currency</label>

                <select
                  className="border rounded-xl px-4 py-3 outline-none focus:border-black"
                  {...register("price.currency")}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="font-semibold">Sizes & stock</label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {productSizes.map((size, index) => (
                  <div key={size} className="border rounded-xl p-3">
                    <p className="font-bold">{size}</p>

                    <input type="hidden" {...register(`sizes.${index}.size`)} />

                    <input
                      type="number"
                      min="0"
                      className="w-full border rounded-lg px-3 py-2 mt-2"
                      placeholder="Stock"
                      {...register(`sizes.${index}.stock`, {
                        valueAsNumber: true,
                      })}
                    />

                    {errors.sizes?.[index]?.stock && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.sizes[index].stock.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Replace Product Images</label>

              <input
                type="file"
                accept="image/*"
                multiple
                className="border rounded-xl p-3"
                {...register("images")}
              />

              <p className="text-xs text-gray-500">
                Leave empty to keep the existing images.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3.5 rounded-xl bg-[#171513] text-white font-semibold disabled:opacity-60">
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProduct;
