const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({

  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },
  userName: String,

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


  gym: String,

  friends: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },

  height: {
    type: Number,
  },
  favouriteExcercise: [String],
  favouriteFood: [String],

  chest: [{
    x: Date,
    y: Number
  }],
  squat: [{
    x: Date,
    y: Number
  }],
  dead: [{
    x: Date,
    y: Number
  }]


},

  {
    timestamps: true,
  })

module.exports = model("User", userSchema)