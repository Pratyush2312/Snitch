import { Link } from "react-router";
import useAuthHook from "../hooks/useAuthHook";

function Register() {
  const { register, handleSubmit, watch, errors, handleRegister } =
    useAuthHook();
  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e4dfd8] p-8 md:p-10">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="text-2xl font-black tracking-tight">
              Mini<span className="text-[#d96f2b]">Store</span>
            </Link>
            <h1 className="text-3xl font-bold mt-4">Create account</h1>
            <p className="text-gray-500">Join MiniStore and get started.</p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513]"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold">
                  Confirm
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513]"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-semibold">
                Account type
              </label>
              <select
                id="role"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#171513] bg-white"
                {...register("role")}>
                <option value="user">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#171513] text-white rounded-xl py-3.5 font-semibold hover:bg-[#302c28] transition mt-1">
              Create account
            </button>
          </form>

          <div className="flex justify-center gap-1 text-sm">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
