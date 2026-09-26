const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true,
    validate: {
      validator: function(valor) {
        return validator.isStrongPassword(valor, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
        })
      },
      message: 'The password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.'
    }
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User