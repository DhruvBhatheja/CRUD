
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
