//import React from "react";

const LogInBody = () => {
  return (
    <div className="h-auto lg:h-[75vh] flex flex-col-reverse lg:flex-row items-center lg:items-center px-4 lg:px-16">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center mt-8 lg:mt-0">
        <p className="mt-4 text-lg lg:text-xl text-zinc-400 text-center lg:text-left">
          Log in to your account and continue exploring a curated collection of
          legal resources designed to empower you with knowledge and tools to
          navigate the legal landscape.
        </p>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-yellow-100 mb-6 text-center">
            Log In
          </h2>
          <form className="space-y-4">
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
            <div className="text-right">
              <a
                href="#"
                className="text-yellow-400 hover:underline text-sm"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all duration-300"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-zinc-400"> Don't have an account?{" "}
            <a href="/signup" className="text-yellow-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInBody;
