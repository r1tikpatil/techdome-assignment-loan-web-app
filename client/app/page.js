"use client";

const Home = () => {
  return (
    <div>
      <div className="bg-gray-100 h-[90vh] p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Welcome to LoanApp
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your trusted financial partner for all your loan needs.
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Apply for a Loan
            </button>
          </div>
        </div>
      </div>

      <footer className="text-center text-gray-500 mt-8">
        &copy; 2023 LoanApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
