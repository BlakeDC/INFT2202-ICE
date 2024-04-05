const mongoose = require('mongoose');
require('dotenv').config();

//  Connect to MongoDB Server using the connection string in the `.env` file.
const conn = process.env.DB_STRING;

mongoose.connect(conn);

// Creates simple schema for a User. 
// The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
	username: String,
	hashPassword: String,
	isAdmin: { type: Boolean, required: true, default: false }
});
module.exports.User = mongoose.model('User', UserSchema);

