const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.xic3nxf.mongodb.net/${DB_NAME}`);

// mongoose.set('useCreateIndex', true);

// declare Schema
let Schema = mongoose.Schema;

// User schema
let userSchema = new Schema({
    name: {
    type: String,
    required: true
},
age: Number,
email: String,
createdAt: {
    type: Date,
    default: Date.now
},
isActive: {
    type: Boolean,
    default: true
},
friends: [String],
address: {
    street: String,
    city: String,
    state: String,
    zip: String
    }
});

// Export schemas as models
module.exports.User = mongoose.model('User', userSchema);