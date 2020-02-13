const router = require('express').Router();

// const bcrypt = require('bcryptjs')

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

            if (req.session && req.session.user) {
                next()
            } else {
                res.status(401).json({message: "Not authorized"})
            }
}

module.exports = router;