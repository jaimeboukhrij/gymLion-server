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
    required: [true, 'El Nombre es obligatorio']
  },

  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },

  avatar: {
    type: String,
    required: [true, 'La imagen es obligatorio']
  },

  IMB: {
    type: Number,
  },

  weight: {
    type: Number,
  },

  height: {
    type: Number,
  },

},

  {
    timestamps: true,
  })

module.exports = model("User", userSchema)