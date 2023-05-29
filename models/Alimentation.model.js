const mongoose = require("mongoose")
const { Schema, model } = mongoose

const AlimentationSchema = new Schema({


    foods: [
        [breakfast],
        [lunch],
        [dinner],
        [snacks]
    ]
    ,

    aliment: {
        type: String,
        calories: {
            type: Number
        }
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
    owner: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
},

    {
        timestamps: true,
    })

module.exports = model("Alimentation", AlimentationSchema)