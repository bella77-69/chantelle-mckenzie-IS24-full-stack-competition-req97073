const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT;

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Routes
 */
app.get("/api", (req, res) => {
  res.send("Hello welcome to the API");
});

/**
 * Server
 */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
