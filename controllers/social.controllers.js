const Post = require('../models/Post.Model')
const User = require('./../models/User.model')



const savePost = (req, res, next) => {

    const { text, urlCloudinary } = req.body
    const { _id: idOwner, gym } = req.payload


    let timeNow = new Date()
    console.log("text y cloud", text, urlCloudinary)

    if (text || urlCloudinary) {

        Post
            .create({ text: text, image: urlCloudinary, owner: idOwner, time: timeNow, gym: gym })
            .then(response => {
                res.json(response)
                console.log("creaaaandoooo poooost")

            })
            .catch((err) => next(err));

    }
}


const getPost = (req, res, next) => {

    const { _id: owner, gym } = req.payload

    Post
        .find({ gym })
        .then(response => res.json(response))
        .catch((err) => next(err));

}

module.exports = { savePost, getPost }