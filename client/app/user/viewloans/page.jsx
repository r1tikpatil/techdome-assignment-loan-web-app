"use client";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/actions/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [loans, setLoans] = useState([]);
  const router = useRouter();
  const { user, logOutUser, getLoansById } = useContext(GlobalContext);

  if (!user) {
    router.push("/user/signin");
    return;
  } else if (user.isAdmin === true) {
    logOutUser();
    router.push("/user/signin");
    return;
  }


  const getLoans = async () => {
    const res = await getLoansById(user._id);
    setLoans(res);
  };

  useEffect(() => {
    getLoans();
  }, []);

  if (loans.length === 0) {
    return (
      <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[100vh] pt-16 text-center">
        <p className="text-lg text-gray-600 font-semibold mt-8">
          No loans taken.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[100vh] pt-24 w-screen flex justify-items-center  justify-center">
      <div className="w-full h-[90%] rounded sm:w-4/5 lg:w-1/2 border-2 border-white md:p-8 pt-0 shadow-lg">
        <h1 className="text-lg md:text-2xl mb-4 text-center underline ">
          My Loans
        </h1>
        <div className="h-[88%] overflow-y-auto overflow-hidden">
          <ul>
            {loans.map((loan) => (
              <li
                key={loan._id}
                className="rounded p-4 shadow-md mb-4 flex flex-col gap-4 sm:flex-row items-center justify-between border border-white "
              >
                <div>
                  <p>
                    <strong>Amount:</strong> ₹{loan.amount}
                  </p>
                </div>
                <div className="">
                  <p>
                    <strong>Term:</strong> {loan.term} weeks
                  </p>
                </div>
                <div className="text-center">
                  {loan.state === "PENDING" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        disabled={true}
                      >
                        PENDING
                      </button>
                    </>
                  )}
                  {loan.state === "APPROVED" && (
                    <Link
                      href={`/user/viewloans/${loan._id}`}
                      className="text-white px-2 py-1 rounded cursor-pointer bg-pink-500"
                    >
                      APPROVED
                    </Link>
                  )}
                  <div className="">
                    {loan.state === "PAID" && (
                      <p className="text-blue-500 pl-20  text-center">PAID</p>
                    )}
                  </div>
                  {loan.state === "REJECT" && (
                    <p className="text-white px-2 py-1 rounded  bg-red-500">
                      REJECTED
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
