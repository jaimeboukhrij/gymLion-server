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
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    minlength: [3, 'El nombre de usuario es demasiado corto']
  }
})

module.exports = model("User", userSchema)