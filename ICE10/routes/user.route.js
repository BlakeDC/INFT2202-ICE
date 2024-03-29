const express = require('express');
const { userView } = require('../controllers/user.controller');

// Create an express router object
const router = express.Router();

// Handle the '/student' URL with a GET method to use studentView function
router.get('/users', userView);

// Export the router
module.exports = router;