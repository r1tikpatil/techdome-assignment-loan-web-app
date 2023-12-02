"use client";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[95vh] p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Welcome to LoanApp
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your trusted financial partner for all your loan needs.
          </p>
          <div className="flex justify-center">
            <Link
              href="/user/signin"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Apply for a Loan
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
