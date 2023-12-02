"use client";
import Link from "next/link";
import React, { useContext } from "react";
import GlobalContext from "@/actions/context";

const Home = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div>
      <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[95vh]  p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Welcome to LoanApp
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your trusted financial partner for all your loan needs.
          </p>
          <div className="flex justify-center">
            <Link
              href={
                user
                  ? user.isAdmin
                    ? "/admin/requests"
                    : "/user/createloan"
                  : "/user/signin"
              }
              className="bg-pink-700 text-center text-white font-bold py-2 w-[80vw] lg:w-[20vw] px-4 rounded"
            >
              {user && user.isAdmin
                ? "Check Loan Requests"
                : "Apply for a Loan"}
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500">
        &copy; 2023 LoanApp. All rights reserved.
      </p>
    </div>
  );
};

export default Home;
