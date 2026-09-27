import { Link } from "react-router";
import Navbar from "../../../shared/Navbar";

function SellerDashboard() {
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

        <div className="mt-10">
          <div className="bg-white border border-[#e4dfd8] rounded-3xl p-14 text-center">
            <h2 className="text-2xl font-bold">Your Products</h2>

            <p className="text-gray-500 mt-2">
              Your listed products will appear here.
            </p>

            <Link
              to="/seller/products/new"
              className="inline-flex mt-6 px-6 py-3 rounded-xl bg-[#171513] text-white font-semibold">
              Add Product
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellerDashboard;
