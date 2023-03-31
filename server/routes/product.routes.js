const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = "./data/products.json";

/**
 * Utility functions
 **/
const saveProductsData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getProductsData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const generateShortId = () => {
  const id = Math.floor(Math.random() * 1000) + 1;
  return id.toString();
};

/*
 * Routes
 */
/**
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of all products.
 *       400:
 *        description: Error reading file.
 *     tags:
 *       - Products
 */
router.get("/products", (req, res) => {
  fs.readFile("./data/products.json", "utf8", (err, data) => {
    const productsData = JSON.parse(data);
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      res.status(200).send(productsData);
    }
  });
});

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: The requested product.
 *
 *       404:
 *         description: Product not found.
 *     tags:
 *       - Products
 */
router.get("/products/:productId", (req, res) => {
  const productsId = req.params.productId;
  const productData = getProductsData(); // Get the product ID from the request parameters
  const product = productData.products.find(
    (product) => product.productId === productsId
  ); // Find the product with the matching ID
  if (!product) {
    res.status(404).send("Product not found"); // Return a 404 error if the product is not found
  } else {
    res.json(product); // Return the prduct data
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the given information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       201:
 *         description: The created product.
 *       400:
 *         description: Invalid request body.
 *     tags:
 *       - Products
 */
router.post("/products", (req, res) => {
  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;
  const productsData = getProductsData();
  const productId = generateShortId();
  const newProduct = {
    productId,
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  };
  productsData.products.push(newProduct); // Add the new product object to the product array
  saveProductsData(productsData); // Save the updated product data to the JSON file
  res.status(201).json(newProduct); // Return the new product object as the response
});
/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update an existing product with the given information by ID.
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: The updated product.
 *       400:
 *         description: Invalid request body or product ID.
 *       404:
 *         description: Product not found.
 *     tags:
 *       - Products
 */
router.put("/products/:productId", (req, res) => {
  const productsData = getProductsData();
  const productId = req.params.productId;
  // Find the product to update
  const productToUpdate = productsData.products.find(
    (product) => product.productId === productId
  );
  // If product not found, send 404 error response
  if (!productToUpdate) {
    res.status(404).send("product not found");
  } else {
    // Update the product properties
    productToUpdate.productName = req.body.productName;
    productToUpdate.productOwnerName = req.body.productOwnerName;
    productToUpdate.Developers = req.body.Developers;
    productToUpdate.scrumMasterName = req.body.scrumMasterName;
    productToUpdate.startDate = req.body.startDate;
    productToUpdate.methodology = req.body.methodology;
    saveProductsData(productsData); // Save the updated data to the JSON file
    res.status(200).send("product updated successfully");
  }
});
/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete an existing product with the given ID.
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product successfully deleted.
 *       400:
 *         description: Invalid product ID.
 *       404:
 *         description: Product not found.
 *     tags:
 *       - Products
 */

router.delete("/products/:productId", (req, res) => {
  const id = req.params.productId;
  let productsData = getProductsData();
  // Find index of user with matching productId
  const index = productsData.products.findIndex(
    (product) => product.productId === id
  );

  if (index !== -1) {
    productsData.products.splice(index, 1); // Remove product from array
    saveProductsData(productsData); // Save updated data to file
    res.send(`product with productId ${id} has been deleted`);
  } else {
    res.status(404).send(`product with productId ${id} not found`);
  }
});

module.exports = router;
