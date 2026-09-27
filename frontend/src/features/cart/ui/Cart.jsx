import { Link } from "react-router";
import Navbar from "../../../shared/Navbar";
import { useEffect } from "react";
import useCartHook from "../hooks/useCartHook";

function Cart() {
  const { getCart, cart } = useCartHook();

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price?.amount || 0) * item.quantity,
    0,
  );

  const currency = cart[0]?.price?.currency || "INR";

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#171513]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#d96f2b] text-sm font-semibold uppercase tracking-widest">
              Your bag
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Shopping Cart
            </h1>
          </div>

          <Link to="/products" className="font-semibold hover:text-[#d96f2b]">
            Continue shopping →
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#e4dfd8] rounded-3xl p-16 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>

            <p className="text-gray-500 mt-2">
              Add something you like and it will appear here.
            </p>

            <Link
              to="/products"
              className="inline-flex mt-7 px-6 py-3 rounded-xl bg-[#171513] text-white font-semibold">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="bg-white border border-[#e4dfd8] rounded-2xl p-4 flex gap-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 rounded-xl object-cover bg-[#eeeae5] shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="font-bold">{item.title}</h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      </div>

                      <p className="font-bold">
                        {item.price?.currency} {item.price?.amount}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button type="button" className="px-3 py-1.5">
                          −
                        </button>

                        <span className="px-3">{item.quantity}</span>

                        <button type="button" className="px-3 py-1.5">
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-sm text-red-600 font-semibold">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-[#171513] text-white rounded-3xl p-7 h-fit">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="border-t border-white/15 mt-6 pt-6 flex justify-between">
                <span className="text-gray-400">Total</span>

                <span className="text-2xl font-bold">
                  {currency} {total}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block text-center w-full mt-7 py-3.5 rounded-xl bg-white text-[#171513] font-semibold">
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
