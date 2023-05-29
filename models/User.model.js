const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({

  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },

  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
  },

  secondName: {
    type: String,
  },

  profileImg: {
    type: String,
  },

},

  {
    timestamps: true,
  })

module.exports = model("User", userSchema)