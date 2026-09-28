import { Link, useParams } from "react-router";
import Navbar from "../../../shared/Navbar";
import { useEffect, useState } from "react";
import api from "../../../api/api";
import useProductHook from "../hooks/useProductHook";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useProductHook();
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const productData = res.data.data.product;

        setProduct(productData);

        if (productData.sizes?.length) {
          setSelectedSize(productData.sizes[0].size);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetails();
  }, [id]);

  const selectedSizeData = product.sizes?.find(
    (item) => item.size === selectedSize,
  );

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <Link
          to="/products"
          className="text-sm font-semibold hover:text-[#d96f2b]">
          ← Back to products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#e4dfd8] aspect-square">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-7 py-4">
            <div>
              <p className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">
                MiniStore Collection
              </p>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
                {product.title}
              </h1>

              <p className="text-2xl font-bold mt-5">
                {product.price?.currency} {product.price?.amount}
              </p>
            </div>

            <p className="text-gray-600 leading-7">{product.description}</p>

            <div>
              <p className="font-semibold mb-3">Select size</p>

              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    disabled={item.stock <= 0}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setQuantity(1);
                    }}
                    className={`min-w-14 px-4 py-3 rounded-xl border font-semibold ${
                      selectedSize === item.size
                        ? "bg-[#171513] text-white border-[#171513]"
                        : "bg-white border-gray-300"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}>
                    {item.size}
                  </button>
                ))}
              </div>

              {selectedSizeData && (
                <p className="text-sm text-gray-500 mt-3">
                  {selectedSizeData.stock} available
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>

              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="px-4 py-3">
                  −
                </button>

                <span className="px-4 font-semibold">{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) =>
                      Math.min(selectedSizeData?.stock || 1, value + 1),
                    )
                  }
                  className="px-4 py-3">
                  +
                </button>
              </div>
            </div>

            <button
              onClick={()=>addToCart(id,quantity,selectedSize)}
              type="button"
              className="w-full py-4 rounded-xl bg-[#171513] text-white font-semibold hover:bg-[#302c28] transition">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
