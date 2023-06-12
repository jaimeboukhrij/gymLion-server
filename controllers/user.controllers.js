const Post = require('../models/Post.Model')
const User = require('./../models/User.model')
const mongoose = require('mongoose');




const getOneUser = (req, res, next) => {

    const { id } = req.params

    const objectIdToSearch = id; // Reemplaza con el valor del ObjectId que deseas buscar

    User.findOne({ _id: new mongoose.Types.ObjectId(objectIdToSearch) })
        .then(response => {
            const data = {
                img: response.avatar,
                userName: response.userName,
                gym: response.gym || ""
            }


            res.json(data)
        })
        .catch(err => console.error(err));


}

const addGym = (req, res, next) => {

    const { _idGym } = req.params
    const { _id: id, email } = req.payload


    User
        .findOneAndUpdate({ email }, { gym: _idGym })
        .then(response => res.json(response))
        .catch(err => console.error(err));


}


const getGymMembers = (req, res, next) => {


    console.log("en servidoooooor")

    const { _id } = req.payload




    User
        .findOne({ _id })
        .then(({ gym }) => {
            User
                .find({ gym })
                .select({ userName: 1, avatar: 1, firstName: 1, lastName: 1 })
                .then((response) => res.json(response))
                .catch(err => next(err))
        })





}





module.exports = {
    getOneUser,
    addGym,
    getGymMembers
}