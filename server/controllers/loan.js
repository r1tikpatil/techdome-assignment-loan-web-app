const Loan = require("../models/loan");
const Payment = require("../models/payment");

const calculatePayments = (loan, payments) => {
  const { _id } = loan;

  if (!Array.isArray(payments) || payments.length === 0) {
    console.error("Invalid or empty payments array");
    return [];
  }

  return payments.map((payment) => ({
    loanId: _id,
    amount: payment.amount,
    totalAmount: payment.amount,
    date: payment.date,
    status: "PENDING",
  }));
};

exports.createLoan = async (req, res) => {
  try {
    const { userId, amount, term, payments } = req.body;

    const loan = await Loan.create({ userId, amount, term });

    const scheduledRepayments = calculatePayments(loan, payments);

    await Payment.insertMany(scheduledRepayments);

    return res.status(200).json({
      success: true,
      message: "Successfully created loan!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find({}).populate({
      path: "userId",
      select: "name email isAdmin",
    });

    return res.status(200).send({
      success: true,
      loans,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
