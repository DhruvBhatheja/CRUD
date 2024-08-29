// models/User.js
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    _id: String, // Use String if _id is not an ObjectId
    id: Number, // Ensure this field matches your data type
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,
}, { collection: 'userdb' }); // Specify collection name

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
