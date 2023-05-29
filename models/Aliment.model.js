const mongoose = require("mongoose")
const { Schema, model } = mongoose

const AlimentSchema = new Schema(
    {
        name: String,
        calories: Number,
        macros: {
            protein: Number,
            Ch: Number,
            fat: Number
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    })

module.exports = model("Aliment", AlimentSchema)