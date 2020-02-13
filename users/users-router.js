const router = require('express').Router();

const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js')




router.get('/', auth, (req,res) => {
    
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch( err => {
            res.status(500).json(err)
        })
})

function auth(req, res, next) {
    const { username, password } = req.headers;

    Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = router;