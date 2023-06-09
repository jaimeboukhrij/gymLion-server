const User = require('./../models/User.model')


const getUserFavouriteExercise = (req, res, next) => {


    const { _id: idOwner, email } = req.payload

    User
        .findOne({ email })
        .then(({ favouriteExcercise }) => res.json(favouriteExcercise))
        .catch(err => next(err))
}

const saveUserFavouriteExercise = (req, res, next) => {



    const { _id: idOwner, email } = req.payload
    const { idExcercise } = req.params

    User
        .findOne({ email })
        .then(({ favouriteExcercise }) => {
            let addFavourite
            if (!favouriteExcercise.includes(idExcercise)) { addFavourite = [...favouriteExcercise, idExcercise] }
            else { next() }

            User
                .findByIdAndUpdate(idOwner, { favouriteExcercise: addFavourite })
                .then(response => res.json(response))
                .catch(err => next(err))
        })
        .catch(err => next(err))


}


const deleteUserFavouriteExercise = (req, res, next) => {

    const { _id: idOwner, email } = req.payload
    const { idExcercise } = req.params

    User
        .findOne({ email })
        .then(({ favouriteExcercise }) => {
            let addFavourite = favouriteExcercise.filter(fruit => fruit !== idExcercise);

            User
                .findByIdAndUpdate(idOwner, { favouriteExcercise: addFavourite })
                .then(response => res.json(response))
                .catch(err => next(err))
        })
        .catch(err => next(err))


}





const getUserMarks = (req, res, next) => {
    console.log("----enservidor", req.params)

    const { showExercise } = req.params
    const { _id: idOwner, email } = req.payload


    User
        .findOne({ email })
        .select({ chest: 1, dead: 1, squat: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editUserMarks = (req, res, next) => {

    const { _id: idOwner, email } = req.payload

    const { markDate, markWeight, showExercise } = req.body

    console.log("lo que traigo del cliente, ", markDate, markWeight, showExercise)




    User
        .findOne({ email })
        .then(({ chest, squat, dead }) => {

            let newMarkChest, newMarkSquat, newMarkDead

            showExercise == "chest" ? newMarkChest = [...chest, { x: markDate, y: markWeight }] : newMarkChest = [...chest]
            showExercise == "squat" ? newMarkSquat = [...squat, { x: markDate, y: markWeight }] : newMarkSquat = [...squat]
            showExercise == "dead" ? newMarkDead = [...dead, { x: markDate, y: markWeight }] : newMarkDead = [...dead]

            User
                .findByIdAndUpdate(idOwner, { chest: newMarkChest, squat: newMarkSquat, dead: newMarkDead })
                .then(response => res.json(response))
                .catch(err => next(err))
        })
        .catch(err => next(err))


}

const deleteUserMarks = (req, res, next) => {

}



module.exports = {
    getUserFavouriteExercise, saveUserFavouriteExercise, deleteUserFavouriteExercise,
    getUserMarks, editUserMarks, deleteUserMarks
}