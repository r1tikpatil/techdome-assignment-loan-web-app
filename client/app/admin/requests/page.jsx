"use client";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/actions/context";
import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";
import { useRouter } from "next/navigation";

const LoanItem = ({ loan, handleAccept, handleReject }) => (
  <li
    key={loan._id}
    className="bg-gradient-to-b from-blue-100 to-blue-300 rounded-md p-4 shadow-md mb-4 flex items-center justify-between sm:m-5"
  >
    <div className="text-gray-700">
      <p>
        <span>User:</span> {loan.userId.name}
      </p>
      <p>
        <span>Email:</span> {loan.userId.email}
      </p>
      <p>
        <span>Loan Amount:</span> ₹{loan.amount}
      </p>
      <p>
        <span>Term:</span> {loan.term} weeks
      </p>
    </div>

    <div className="flex items-center">
      {loan.state === "PENDING" && (
        <>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mr-2"
            onClick={() => handleAccept(loan._id, "APPROVED")}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            onClick={() => handleReject(loan._id, "REJECT")}
          >
            Reject
          </button>
        </>
      )}
      {loan.state === "APPROVED" && (
        <p className="text-green-500 font-bold">Approved</p>
      )}
      {loan.state === "PAID" && <p className="text-blue-500 font-bold">Paid</p>}
      {loan.state === "REJECT" && (
        <p className="text-red-500 font-bold">Rejected</p>
      )}
    </div>
  </li>
);

const LoanList = ({ loans, handleAccept, handleReject }) => {
  if (loans.length === 0) {
    return (
      <div className="mt-4 text-center ">
        <h2 className="text-2xl mb-4 font-semibold text-gray-800">
          Loan Status
        </h2>
        <p className="text-gray-600">No loan requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col h-full items-center">
      <h2 className="text-2xl font-semibold h-[8%] mb-2 text-center">
        Loan Status
      </h2>
      <div className="overflow-y-auto overflow-hidden h-[87%] w-2/3 md:w-1/2 lg:w-1/3">
        <ul className="w-full ">
          {loans.map((loan) => (
            <LoanItem
              key={loan._id}
              loan={loan}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Page = () => {
  const { user, logOutUser, getAllLoans, updateLoanState } =
    useContext(GlobalContext);

  const router = useRouter();
  if (!user) {
    router.push("/admin/signin");
    return;
  } else if (user.isAdmin !== true) {
    logOutUser();
    router.push("/");
    return;
  }

  const [loans, setLoans] = useState([]);

  const getLoans = async () => {
    try {
      const res = await getAllLoans();
      setLoans(res);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  const handleAction = async (loanId, state) => {
    try {
      const res = await updateLoanState({ loanId, state });
      if (res.success) {
        successMessageToast(res.message);
      } else {
        errorMessageToast(res.message);
      }
      await getLoans();
    } catch (error) {
      console.error("Error updating loan state:", error);
    }
  };

  const handleAccept = (loanId) => handleAction(loanId, "APPROVED");
  const handleReject = (loanId) => handleAction(loanId, "REJECT");

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300  h-[100vh] p-4 pt-16">
      <LoanList
        loans={loans}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    </div>
  );
};

export default Page;
