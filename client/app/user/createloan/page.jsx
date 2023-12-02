"use client";
import { useState, useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";

import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");
  const [installments, setInstallments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const { createLoan, user, logOutUser } = useContext(GlobalContext);
  const router = useRouter();

  if (!user) {
    router.push("/user/signin");
    return;
  } else if (user.isAdmin === true) {
    logOutUser();
    router.push("/user/signin");
    return;
  }

  const handleApply = async () => {
    try {
      const response = await createLoan({
        amount: loanAmount,
        term,
        payments: installments,
        userId: user._id,
      });

      if (response.success) {
        successMessageToast(response.message);
        setShowPayments(false);
        setInstallments([]);
        setTerm("");
        setLoanAmount("");
        setTimeout(() => {
          router.push("/user/dashboard");
        }, 2000);
      } else {
        errorMessageToast(response.message);
      }
    } catch (err) {
      console.log(err);
      errorMessageToast(err);
    }
  };

  const calculateInstallments = () => {
    if (!loanAmount || !term) {
      return;
    }

    const loanAmountFloat = parseFloat(loanAmount);
    const termInt = parseInt(term);
    const weeklyInstallment = Math.floor(loanAmountFloat / termInt);

    const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
    const currentDate = new Date();
    const installmentsData = [];

    for (let i = 1; i <= termInt; i++) {
      const installment = {
        date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
        amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(2),
      };
      installmentsData.push(installment);
    }

    setInstallments(installmentsData);
    setShowPayments(true);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[100vh] ">
      <div className="flex flex-col lg:flex-row items-center justify-center pt-8 h-[80%]">
        <div className="border p-4 shadow-md border-white flex flex-col mx-8 md:h-full md:w-2/5 lg:w-1/4 lg:h-[70%] rounded-md m-8 justify-center items-center">
          <div className="mb-4">
            <label className="block mb-2 text-center text-gray-800">
              Loan Amount
            </label>
            <input
              type="number"
              className="border rounded px-4 py-2 focus:outline-none focus:border-pink-500"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-center text-gray-800">
              Term (in weeks)
            </label>
            <input
              type="number"
              className="border rounded px-4 py-2 focus:outline-none focus:border-pink-500"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600 focus:outline-none"
            onClick={calculateInstallments}
          >
            Schedule
          </button>
        </div>

        <div className="p-4 border border-white pb-4 shadow-lg w-full lg:w-1/3 lg:h-[70%] rounded">
          <h2 className="text-2xl mb-4 text-gray-800">Scheduled Payments</h2>
          {showPayments ? (
            <div className="h-[85%] overflow-hidden overflow-y-auto">
              <ul>
                {installments.map((installment, index) => (
                  <li
                    key={index}
                    className="border border-white  p-3 mb-2 rounded shadow-md"
                  >
                    {`Week ${index + 1}: ${formatDate(installment.date)} - ₹${
                      installment.amount
                    }`}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No payments scheduled yet.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center h-[10%]">
        <button
          onClick={handleApply}
          className="cursor-pointer hover:scale-110 w-40 h-10 mx-auto bg-pink-500 flex items-center justify-center text-white my-12 mb-12 rounded-full focus:outline-none"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
