const mongoose = require("mongoose")
const { Schema, model } = mongoose

const MealDaySchema = new Schema({



},

    {
        timestamps: true,
    })

module.exports = model("MealDay", MealDaySchema)