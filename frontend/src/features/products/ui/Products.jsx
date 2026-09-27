import { Link } from "react-router";
import useProductHook from "../hooks/useProductHook";
import Navbar from "../../../shared/Navbar";

function Products() {
  const { products, loading, error } = useProductHook();

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />
      <section className="border-b border-[#e4dfd8] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <span className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">Our Collection</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-3">Products</h1>
          <p className="text-gray-500 max-w-xl text-lg mt-4">Explore our collection of carefully selected products.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {loading && <div className="py-24 text-center text-gray-500">Loading products...</div>}
        {error && !loading && <div className="py-24 text-center text-red-600">{error}</div>}

        {!loading && !error && products.length === 0 && <div className="py-24 text-center text-gray-500">No products available.</div>}

        {!loading && !error && products.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product) => (
              <article key={product._id} className="group bg-white rounded-2xl overflow-hidden border border-[#e4dfd8] hover:shadow-xl transition">
                <Link to={`/products/${product._id}`} className="block relative aspect-[4/4.5] overflow-hidden bg-[#eeeae5]">
                  <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </Link>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-lg truncate">{product.title}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mt-1">{product.description}</p>
                    </div>
                    <span className="font-bold text-[#d96f2b] whitespace-nowrap">{product.price?.currency} {product.price?.amount}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes?.map((item) => <span key={item._id} className="px-3 py-1.5 rounded-lg bg-[#f4f1ed] text-xs font-semibold">{item.size}</span>)}
                  </div>
                  <Link to={`/products/${product._id}`} className="w-full text-center py-3 rounded-xl bg-[#171513] text-white font-semibold hover:bg-[#302c28] transition">View Product</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
