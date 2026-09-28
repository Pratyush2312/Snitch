import { Link } from "react-router";
import Navbar from "../../../shared/Navbar";
import useSellerHook from "../hooks/useSellerHook";

function SellerDashboard() {
  const { productsBySeller, handleDeleteProduct } = useSellerHook();

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">
              Seller area
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">Dashboard</h1>

            <p className="text-gray-500 mt-3">
              Manage the products you have listed.
            </p>
          </div>

          <Link
            to="/seller/products/new"
            className="px-5 py-3 rounded-xl bg-[#171513] text-white font-semibold text-center">
            + Add Product
          </Link>
        </div>

        {/* Products */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Your Products</h2>

            <p className="text-sm text-gray-500">
              {productsBySeller.length}{" "}
              {productsBySeller.length === 1 ? "product" : "products"}
            </p>
          </div>

          {productsBySeller.length === 0 ? (
            <div className="bg-white border border-[#e4dfd8] rounded-3xl p-14 text-center">
              <h2 className="text-2xl font-bold">No products yet</h2>

              <p className="text-gray-500 mt-2">
                Start selling by adding your first product.
              </p>

              <Link
                to="/seller/products/new"
                className="inline-flex mt-6 px-6 py-3 rounded-xl bg-[#171513] text-white font-semibold">
                Add Product
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsBySeller.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-[#e4dfd8] rounded-3xl overflow-hidden">
                  {/* Image */}
                  <div className="h-64 bg-[#f1eee9]">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold">{product.title}</h3>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <span className="text-lg font-bold">
                        {product.price?.currency} {product.price?.amount}
                      </span>
                    </div>

                    {/* Sizes */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2">
                        Sizes & Stock
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {product.sizes?.map((item) => (
                          <span
                            key={item._id || item.size}
                            className="px-3 py-1.5 rounded-lg bg-[#f7f5f2] text-sm">
                            {item.size}: {item.stock}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <Link
                        to={`/seller/products/${product._id}/edit`}
                        className="flex-1 text-center px-4 py-2.5 rounded-xl border border-[#171513] font-semibold hover:bg-[#171513] hover:text-white transition">
                        Edit
                      </Link>

                      <button
                        onClick={()=>handleDeleteProduct(product._id)}
                        type="button"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SellerDashboard;
