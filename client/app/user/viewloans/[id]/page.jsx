"use client";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/actions/context";
import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";
import { useRouter } from "next/navigation";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
};

const PaymentRow = ({ repayment }) => (
  <tr>
    <td className="border border-white  px-4 py-2 text-center">
      {repayment.totalAmount}
    </td>
    <td className="border border-white  px-4 py-2 text-center">
      {repayment.amount}
    </td>
    <td className="border border-white  px-4 py-2 text-center">
      {formatDate(repayment.date)}
    </td>
    <td
      className={`border border-white  px-4 py-2 text-center ${
        repayment.status === "PENDING" ? "text-red-500" : "text-green-500"
      }`}
    >
      {repayment.status}
    </td>
  </tr>
);

const Page = ({ params }) => {
  const [repayments, setRepayments] = useState([]);
  const { getPaymentsById, doPayment } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);

  const fetchRepayments = async () => {
    try {
      const res = await getPaymentsById(params.id);
      setRepayments(res);
    } catch (error) {
      console.error("Error fetching repayments:", error);
    }
  };

  useEffect(() => {
    fetchRepayments();
  }, [params.id]);

  useEffect(() => {
    const pendingRepaymentAmounts = repayments
      .filter((repayment) => repayment.status === "PENDING")
      .map((repayment) => parseFloat(repayment.amount));

    const balance = pendingRepaymentAmounts.reduce(
      (acc, amount) => acc + amount,
      0
    );
    setRemainingBalance(balance);
  }, [repayments]);

  const hasPendingRepayments = repayments.some(
    (repayment) => repayment.status === "PENDING"
  );

  const openModal = () => {
    if (hasPendingRepayments) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentAmount("");
  };

  const handlePaymentSubmit = async () => {
    const isValidAmount = repayments.some(
      (repayment) => parseFloat(paymentAmount) >= repayment.amount
    );

    if (isValidAmount) {
      try {
        const res = await doPayment({
          amount: paymentAmount,
          loanId: params.id,
        });

        if (res.success) {
          successMessageToast(res.message);
        } else {
          errorMessageToast(res.message);
        }

        fetchRepayments();
        closeModal();
      } catch (error) {
        console.error("Error submitting payment:", error);
      }
    } else {
      errorMessageToast("Invalid payment amount.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 h-[100vh] to-blue-300 p-4 w-screen pt-20">
      <h1 className="text-center font-semibold text-2xl">Balance Sheet</h1>
      <div className="w-full flex justify-center mt-8">
        <table className="mt-4 w-2/3 border-white border-2 shadow  p-16">
          <thead>
            <tr>
              <th className="border border-white px-4 py-2">Amount</th>
              <th className="border border-white  px-4 py-2">To Pay</th>
              <th className="border border-white  px-4 py-2">Deadline</th>
              <th className="border border-white  px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {repayments.map((repayment, index) => (
              <PaymentRow key={index} repayment={repayment} />
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-center text-xl my-8">
        Remaining Amount: ₹{remainingBalance.toFixed(2)}
      </h1>
      {hasPendingRepayments && (
        <div className="text-center mt-8">
          <button
            className="bg-pink-500 hover:scale-105 transition ease-in-out transform-slow hover:bg-pink-700 text-center text-white font-bold py-2 w-[10vw] px-4 rounded shadow"
            onClick={openModal}
          >
            Pay
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative flex flex-col justify-center items-center h-80  bg-white p-8 w-96 rounded-md z-100 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Make Repayment
            </h2>
            <label className="block mb-4">
              Repayment Amount
              <input
                type="number"
                className="border rounded py-2 px-3 w-full focus:outline-none focus:border-pink-500"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </label>
            <button
              className="bg-pink-500 hover:bg-pink-700 w-full text-white font-bold py-2 px-4 rounded shadow mt-4"
              onClick={handlePaymentSubmit}
            >
              Do Repay
            </button>
            <span
              className="block text-center text-gray-500 cursor-pointer mt-4"
              onClick={closeModal}
            >
              Cancel
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
