import { Link } from "react-router";
import useAuthHook from "../hooks/useAuthHook";
import { useContext } from "react";
import { MyStore } from "../../../context/MyStore";

function Login() {
  const { register, handleLogin, handleSubmit, errors } = useAuthHook();

  const { user } = useContext(MyStore);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e4dfd8] p-8 md:p-10">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="text-2xl font-black tracking-tight">
              Snitch
            </Link>
            <h1 className="text-3xl font-bold mt-4">Welcome back</h1>
            <p className="text-gray-500">Login to continue shopping.</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513] focus:ring-2 focus:ring-[#171513]/10"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email address" },
                })}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513] focus:ring-2 focus:ring-[#171513]/10"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button type="submit" className="bg-[#171513] text-white rounded-xl py-3.5 font-semibold hover:bg-[#302c28] transition">
              Login
            </button>
          </form>

          <div className="flex justify-center gap-1 text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            <Link to="/register" className="font-semibold hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
