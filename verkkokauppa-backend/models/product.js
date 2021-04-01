const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [
    { type: String, required: true }
  ],
  description: {
      type: String,
      minLength: 3
  }
})

module.exports = mongoose.model('Product', schema)