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
  const id = Math.floor(Math.random() * 40) + 1;
  return id.toString();
};

/*
 * Routes
 */

/*
 * GET /api/products
 * Returns all products
 * */
router.get("/", (req, res) => {
  fs.readFile("./data/products.json", "utf8", (err, data) => {
    const productsData = JSON.parse(data);
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      res.status(200).send(productsData);
    }
  });
});

/*
 * GET /api/products/:productId
 * Returns a single product
 * */
router.get('/:productId', (req, res) => {
  const productsId = req.params.productId; 
  const productData = getProductsData(); // Get the product ID from the request parameters
  const product = productData.products.find((product) => product.productId === productsId); // Find the product with the matching ID
  if (!product) {
    res.status(404).send('Product not found'); // Return a 404 error if the product is not found
  } else {
    res.json(product); // Return the prduct data
  }
});


/*
 * POST /api/products
 * Creates a new product
 * */
router.post("/", (req, res) => {
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

/*
 * PUT /api/products/:productId
 * Updates a product
 * */
router.put("/:productId", (req, res) => {
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

/*
 * DELETE /api/products/:productId
 * Deletes a product
 * */
router.delete("/:productId", (req, res) => {
  const id = req.params.productId;
  let productsData = getProductsData();
  // Find index of user with matching productId
  const index = productsData.products.findIndex((product) => product.productId === id);

  if (index !== -1) {
    productsData.products.splice(index, 1); // Remove product from array
    saveProductsData(productsData); // Save updated data to file
    res.send(`product with productId ${id} has been deleted`);
  } else {
    res.status(404).send(`product with productId ${id} not found`);
  }
});

module.exports = router;
