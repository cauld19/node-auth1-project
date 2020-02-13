const express = require('express');

const session = require('express-session')

const sessionConfig = {
    name: 'herm',
    secret: 'its a secret',
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUnitialized: false
};

module.exports = server => {

    server.use(express.json());
    server.use(session(sessionConfig))
    
  };