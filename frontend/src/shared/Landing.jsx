import { Link } from "react-router";
import Navbar from "./Navbar";

function Landing() {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />
      <section className="min-h-[90vh] flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-7">
                <span className="w-fit px-4 py-2 rounded-full bg-[#ebe6df] text-sm font-medium">
                  ✦ Curated for you
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                  Find things
                  <span className="block text-[#d96f2b]">worth having.</span>
                </h1>

                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Discover products you'll love, from everyday essentials to
                  something a little more special. Simple shopping, carefully
                  selected.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/products"
                    className="px-7 py-3.5 rounded-xl bg-[#171513] text-white font-semibold hover:bg-[#302c28] transition">
                    Explore Products →
                  </Link>

                  <Link
                    to="/register"
                    className="px-7 py-3.5 rounded-xl border border-[#d6d0c9] bg-white font-semibold hover:bg-[#eeeae5] transition">
                    Create Account
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">100+</span>
                    <span className="text-sm text-gray-500">Products</span>
                  </div>

                  <div className="h-10 w-px bg-gray-300" />

                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">Easy</span>
                    <span className="text-sm text-gray-500">Shopping</span>
                  </div>

                  <div className="h-10 w-px bg-gray-300" />

                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">Secure</span>
                    <span className="text-sm text-gray-500">Platform</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#e9a36e] rounded-full blur-3xl opacity-40" />

                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#d8c5ad] rounded-full blur-3xl opacity-50" />

                <div className="relative grid grid-cols-2 gap-4">
                  <div className="mt-12 overflow-hidden rounded-4xl bg-[#ded8d0] aspect-4/5">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
                      alt="Fashion product"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="overflow-hidden rounded-4xl bg-[#d9d0c5] aspect-4/5">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
                      alt="Sneakers"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4 w-[85%]">
                  <div className="w-11 h-11 rounded-full bg-[#171513] flex items-center justify-center text-white">
                    ✦
                  </div>

                  <div>
                    <p className="font-semibold">Your next favorite</p>
                    <p className="text-sm text-gray-500">is waiting for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171513] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-4 mb-14">
            <span className="text-[#e89a61] text-sm font-semibold uppercase tracking-widest">
              Why MiniStore
            </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Shopping without the unnecessary stuff.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-5 p-7 rounded-2xl bg-[#24211e]">
              <div className="text-3xl">✦</div>
              <h3 className="text-xl font-semibold">Carefully selected</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse products presented in a clean, distraction-free
                experience.
              </p>
            </div>

            <div className="flex flex-col gap-5 p-7 rounded-2xl bg-[#24211e]">
              <div className="text-3xl">◇</div>
              <h3 className="text-xl font-semibold">Simple experience</h3>
              <p className="text-gray-400 leading-relaxed">
                Find what you need without navigating through unnecessary
                complexity.
              </p>
            </div>

            <div className="flex flex-col gap-5 p-7 rounded-2xl bg-[#24211e]">
              <div className="text-3xl">↗</div>
              <h3 className="text-xl font-semibold">Sell your products</h3>
              <p className="text-gray-400 leading-relaxed">
                Sellers can create, update and manage their own product
                listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#d96f2b] font-semibold mb-4">
            READY WHEN YOU ARE
          </p>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Something good is
            <span className="text-[#d96f2b]"> waiting.</span>
          </h2>

          <p className="text-gray-500 mt-6 max-w-xl mx-auto">
            Explore the collection and discover your next favorite product.
          </p>

          <Link
            to="/products"
            className="inline-flex mt-9 px-8 py-4 rounded-xl bg-[#171513] text-white font-semibold hover:bg-[#302c28] transition">
            Start Shopping →
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-xl">
            Snitch
          </span>

          

          <div className="flex gap-5 text-sm">
            <Link to="/products" className="hover:text-[#d96f2b]">
              Products
            </Link>

            <Link to="/login" className="hover:text-[#d96f2b]">
              Login
            </Link>

            <Link to="/register" className="hover:text-[#d96f2b]">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
