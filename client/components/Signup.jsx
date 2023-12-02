"use client";
import React from "react";
import Link from "next/link";

const SignUp = ({ handleSubmit, values, url, setValues }) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg p-8 w-full sm:w-96">
          <h2 className="text-3xl font-extrabold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none bg-white border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="appearance-none bg-white border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none bg-white border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between flex-col">
              <button
                className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
                type="submit"
              >
                Sign Up
              </button>
              <Link
                href={url}
                className="inline-block align-baseline font-bold text-sm mt-4 text-blue-200 hover:text-blue-300"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
