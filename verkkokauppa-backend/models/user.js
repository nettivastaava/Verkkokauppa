const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    passwordHash: {
      type: String,
      required: true,
    },
    cart: {
      type:Array,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      amount: {
        type: Number,
        required: true
      }
    }
})

schema.plugin(uniqueValidator)

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', schema)