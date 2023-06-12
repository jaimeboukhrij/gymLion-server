const mongoose = require("mongoose")
const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        text: String,
        image: String,
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },
        gym: String,
        time: Date
    },
    {
        timestamps: true,
    })

module.exports = model("Post", PostSchema)