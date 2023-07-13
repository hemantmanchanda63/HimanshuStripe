const mongoose = require('mongoose');

// Define the schema
const STRIPEDATA = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  },
  subscriptionID: {
    type: String,
    required: true
  }
});

// Create the model
const User = mongoose.model('STRIPEDATA', STRIPEDATA);

// Export the model
module.exports = User;
