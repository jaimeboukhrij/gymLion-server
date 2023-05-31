const mongoose = require("mongoose")
const { Schema, model } = mongoose

const MealDayPlanSchema = new Schema(
    {
        date: Date,
        foods: {
            breakfast: [String],
            lunch: [String],
            dinner: [String],
            additional: [String]
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    })

module.exports = model("MealDayPlan", MealDayPlanSchema)