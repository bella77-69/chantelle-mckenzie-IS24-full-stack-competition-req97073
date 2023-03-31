const express = require("express");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const PORT = process.env.PORT;

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());

/**
 * Routes
 */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API IS24-full-stack-competition-req97073",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", productRoutes);

/**
 * Server
 */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
