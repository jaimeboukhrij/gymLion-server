const MealDayPlan = require('./../models/MealDayPlan.model')


const getUserMealPlanDay = (req, res, next) => {

    const { coaster_id } = req.params
    MealDayPlan
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}


const saveUserMealPlaneDay = (req, res, next) => {

    console.log("---------", req.body)
    console.log("-------", req.payload)

}



module.exports = {
    getUserMealPlanDay,
    saveUserMealPlaneDay
}