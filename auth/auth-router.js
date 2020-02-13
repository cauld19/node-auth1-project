const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })
        
});

router.post('/login', (req,res) => {
    let { username, password } = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({message: `Welcome ${user.username}`})
            } else {
                res.status(401).json({message: "Invalid credentials"})
            }
        })
        .catch( err=> {
            res.status(500).json(err)
        })
})

module.exports = router;
