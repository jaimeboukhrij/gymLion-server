const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const saltRounds = 10


router.post('/signup', (req, res, next) => {

  const { email, password, firstName, lastName, avatar } = req.body

  if (password.length < 2) {
    res.status(400).json({ message: 'Password must have at least 2 characters' })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ message: "User already exists." })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      return User.create({ email, password: hashedPassword, firstName, lastName, avatar })
    })
    .then((createdUser) => {

      const { email, firstName, lastName, avatar } = createdUser
      const user = { email, firstName, lastName, avatar }

      res.status(201).json({ user })
    })
    .catch(err => {
      next(err)
    })
})


router.post('/login', (req, res, next) => {

  console.log('secretoo', process.env.TOKEN_SECRET)

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User
    .findOne({ email })
    .then((foundUser) => {


      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { email, firstName, lastName, avatar, _id } = foundUser;
        const payload = { email, firstName, lastName, avatar, _id }


        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        )

        res.json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => next(err));
})


router.get('/verify', isAuthenticated, (req, res, next) => {

  res.status(200).json(req.payload)


})

module.exports = router