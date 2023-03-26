const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const PORT = process.env.PORT;

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());

/**
 * Routes
 */
app.get("/api", (req, res) => {
  res.send("Hello welcome to the API");
});

app.use('/api/users', userRoutes);

/**
 * Server
 */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
