require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./config/mongoose");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
