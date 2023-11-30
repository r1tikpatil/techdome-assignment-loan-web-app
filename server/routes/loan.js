const express = require("express");
const router = express.Router();

const authentication = require("../middleware/authentication");
const { createLoan, getAllLoans } = require("../controllers/loan");

router.post("/createLoan", authentication, createLoan);
router.get("/allLoans", authentication, getAllLoans);

module.exports = router;
