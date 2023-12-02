"use client";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/actions/context";
import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";

const LoanItem = ({ loan, handleAccept, handleReject }) => (
  <li
    key={loan._id}
    className="bg-white rounded p-4 shadow-md mb-4 flex items-center justify-between sm:m-5"
  >
    <div>
      <p>
        <strong>Username:</strong> {loan.userId.name}
      </p>
      <p>
        <strong>Email:</strong> {loan.userId.email}
      </p>
      <p>
        <strong>Amount:</strong> ₹{loan.amount}
      </p>
      <p>
        <strong>Term:</strong> {loan.term} weeks
      </p>
    </div>
    <div>
      {loan.state === "PENDING" && (
        <>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
            onClick={() => handleAccept(loan._id, "APPROVED")}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => handleReject(loan._id, "REJECT")}
          >
            Reject
          </button>
        </>
      )}
      {loan.state === "APPROVED" && <p className="text-green-500">Approved</p>}
      {loan.state === "PAID" && <p className="text-blue-500">Paid</p>}
      {loan.state === "REJECT" && <p className="text-red-500">Rejected</p>}
    </div>
  </li>
);

const LoanList = ({ loans, handleAccept, handleReject }) => {
  if (loans.length === 0) {
    return (
      <div className="mt-4 text-center bg-gray-50">
        <h2 className="text-2xl mb-4 font-bold text-gray-800">Loan Status</h2>
        <p className="text-gray-600">No loan requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center bg-gray-50">
      <h2 className="text-2xl mb-2 text-center">Loan Status</h2>
      <ul className="w-2/3 md:w-1/2 lg:w-1/3">
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
  );
};

const Page = () => {
  const [loans, setLoans] = useState([]);
  const { getAllLoans, updateLoanState } = useContext(GlobalContext);

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
    <div className="bg-gray-100 h-[100vh] p-4 pt-16">
      <LoanList
        loans={loans}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    </div>
  );
};

export default Page;
