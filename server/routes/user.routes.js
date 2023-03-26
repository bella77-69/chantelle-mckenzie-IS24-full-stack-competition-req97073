const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = './data/users.json';

/**
 * Utility functions
**/
const saveUsersData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};

const getUsersData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

/**
 * Routes
 *  - GET /api/users
 * - GET /api/users/:id
 * - POST /api/users
 * - PUT /api/users/:id
 * - DELETE /api/users/:id
 * */
router.get("/", (req, res) => {
    fs.readFile("./data/users.json", "utf8", (err, data) => {
      const usersData = JSON.parse(data);
      if (err) {
        res.status(400).send("Error reading file");
      } else {
        res.status(200).send(usersData);
      }
    });
  });

  router.get('/:id', (req, res) => {
    const productId = req.params.id; // Get the user ID from the request parameters
    const usersData = getUsersData(); // Get the user data from the JSON file
    const user = usersData.users.find(user => user.productId === productId); // Find the user with the matching ID
    if (!user) {
      res.status(404).send('User not found'); // Return a 404 error if the user is not found
    } else {
      res.json(user); // Return the user data
    }
  }); 

  router.post("/", (req, res) => {
    const { productName, productOwnerName, Developers, scrumMasterName, startDate, methodology } = req.body;
    const usersData = getUsersData();
  
    // Generate a random productId using the uuid module
    const { v4: uuidv4 } = require('uuid');
    const productId = uuidv4();
  
    // Create a new user object with the provided data and generated productId
    const newUser = {
      productId,
      productName,
      productOwnerName,
      Developers,
      scrumMasterName,
      startDate,
      methodology,
    };
  
    // Add the new user object to the users array
    usersData.users.push(newUser);
  
    // Save the updated users data to the JSON file
    saveUsersData(usersData);
  
    // Return the new user object as the response
    res.status(201).json(newUser);
  });
  router.put("/:id", (req, res) => {
    const usersData = getUsersData();
    const userId = req.params.id;
  
    // Find the user to update
    const userToUpdate = usersData.users.find((user) => user.productId === userId);
  
    // If user not found, send 404 error response
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      // Update the user properties
      userToUpdate.productName = req.body.productName;
      userToUpdate.productOwnerName = req.body.productOwnerName;
      userToUpdate.Developers = req.body.Developers;
      userToUpdate.scrumMasterName = req.body.scrumMasterName;
      userToUpdate.startDate = req.body.startDate;
      userToUpdate.methodology = req.body.methodology;
  
      // Save the updated data to the JSON file
      saveUsersData(usersData);
  
      res.status(200).send("User updated successfully");
    }
  });
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    let usersData = getUsersData();
  
    // Find index of user with matching productId
    const index = usersData.users.findIndex((user) => user.productId === id);
  
    if (index !== -1) {
      // Remove user from array
      usersData.users.splice(index, 1);
  
      // Save updated data to file
      saveUsersData(usersData);
  
      res.send(`User with productId ${id} has been deleted`);
    } else {
      res.status(404).send(`User with productId ${id} not found`);
    }
  });
  
module.exports = router;