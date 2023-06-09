let ObjectId = require('mongodb').ObjectId
const User = require('../models/User.model')
const MealDayPlan = require('./../models/MealDayPlan.model')

const getUserMealPlanDay = (req, res, next) => {

    const { date, idOwner } = req.params

    MealDayPlan
        .find({ date: `${new Date(date)}`, owner: `${idOwner}` })
        .then(response => res.json(response))
        .catch(err => next(err))
}


const saveUserMealPlaneDay = (req, res, next) => {

    const { breakfast, lunch, dinner, additional } = req.body
    const { date } = req.params
    let { _id: owner } = req.payload

    owner = new ObjectId(owner)

    const foods = {
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        additional: additional
    }


    MealDayPlan
        .find({ date: `${new Date(date)}`, owner: `${owner}` })
        .then((data) => {
            if (!data.length) {
                MealDayPlan
                    .create({ date, foods, owner })
                    .then(response => res.json(response))
                    .catch((err) => next(err))

            }
            else {

            }


        })
}


const editUserMealPlaneDay = (req, res, next) => {

    const { breakfast: newBreakfast, lunch: newLunch, dinner: newDinner, additional: newAdditional } = req.body
    let { _id: owner } = req.payload

    const { date } = req.params

    const ownerId = new ObjectId(owner);

    MealDayPlan
        .find({ date: `${new Date(date)}`, owner: ownerId })
        .then((data) => {
            if (data.length > 0) {

                const { breakfast: currentBreakfast, lunch: currentLunch, dinner: currentDinner, additional: currentAdditional } = data[0].foods;
                const updatedFoods = {
                    breakfast: [...currentBreakfast, ...newBreakfast],
                    lunch: [...currentLunch, ...newLunch],
                    dinner: [...currentDinner, ...newDinner],
                    additional: [...currentAdditional, ...newAdditional]
                };

                MealDayPlan
                    .findByIdAndUpdate(data[0]._id, { foods: updatedFoods }, { new: true })
                    .then(response => res.json(response))
                    .catch((err) => next(err));
            }
            else {
                next()
            }
        })

        .catch((err) => next(err));
}

const deleteUserMealPlaneDay = (req, res, next) => {

    const { index, meal } = req.body
    let { _id: owner } = req.payload

    const { date } = req.params
    const ownerId = new ObjectId(owner);

    MealDayPlan
        .find({ date: `${new Date(date)}`, owner: ownerId })
        .then((data) => {


            const { breakfast: currentBreakfast, lunch: currentLunch, dinner: currentDinner, additional: currentAdditional } = data[0].foods;

            meal === "breakfast" && currentBreakfast.splice(index)
            meal === "lunch" && currentLunch.splice(index)
            meal === "dinner" && currentDinner.splice(index)
            meal === "additional" && currentAdditional.splice(index)

            const updatedFoods = {
                breakfast: [...currentBreakfast],
                lunch: [...currentLunch],
                dinner: [...currentDinner],
                additional: [...currentAdditional]
            };

            MealDayPlan
                .findByIdAndUpdate(data[0]._id, { foods: updatedFoods }, { new: true })
                .then(response => res.json(response))
                .catch((err) => next(err));


        })

        .catch((err) => next(err));
}

const getUserFavouriteFood = (req, res, next) => {
    console.log("controllers-------------------------", req.payload)


    const { email } = req.payload

    User
        .findOne({ email })
        .then(({ favouriteFood }) => res.json(favouriteFood))
        .catch(err => next(err))
}


const saverUserFavouriteFood = (req, res, next) => {
    const { _id: idOwner, email } = req.payload
    const { idFood } = req.params

    User
        .findOne({ email })
        .then(({ favouriteFood }) => {
            let addFavourite
            if (!favouriteFood.includes(idFood)) { addFavourite = [...favouriteFood, idFood] }
            else { next() }

            User
                .findByIdAndUpdate(idOwner, { favouriteFood: addFavourite })
                .then(response => res.json(response))
                .catch(err => next(err))
        })
        .catch(err => next(err))
}

const deleteUserFavouriteFood = (req, res, next) => {
    const { _id: idOwner, email } = req.payload
    const { idFood } = req.params

    User
        .findOne({ email })
        .then(({ favouriteFood }) => {
            let addFavourite = favouriteFood.filter(fruit => fruit !== idFood);

            User
                .findByIdAndUpdate(idOwner, { favouriteFood: addFavourite })
                .then(response => res.json(response))
                .catch(err => next(err))
        })
        .catch(err => next(err))
}





module.exports = {
    getUserMealPlanDay,
    saveUserMealPlaneDay,
    editUserMealPlaneDay,
    deleteUserMealPlaneDay,
    getUserFavouriteFood,
    saverUserFavouriteFood,
    deleteUserFavouriteFood
}