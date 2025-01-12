//import React from "react";

const SignUpBody = () => {
  return (
    <div className="h-auto lg:h-[75vh] flex flex-col-reverse lg:flex-row items-center lg:items-center px-4 lg:px-16">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center mt-8 lg:mt-0">
        <p className="mt-4 text-lg lg:text-xl text-zinc-400 text-center lg:text-left">
          Create an account and join the Legal Read community to explore our curated
          collection of legal resources designed for your needs.
        </p>
      </div>

      {/* Right Section (Sign Up Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-yellow-100 mb-6 text-center">
            Sign Up
          </h2>
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-zinc-400 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 text-zinc-900 rounded-lg bg-zinc-200 focus:outline-none focus:ring focus:ring-yellow-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-zinc-400 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-zinc-900 rounded-lg bg-zinc-200 focus:outline-none focus:ring focus:ring-yellow-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-zinc-400 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 text-zinc-900 rounded-lg bg-zinc-200 focus:outline-none focus:ring focus:ring-yellow-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-zinc-400">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-400 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpBody;
