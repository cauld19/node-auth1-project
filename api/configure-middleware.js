const express = require('express');

const helmet = require('helmet')

const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'herm',
    secret: 'its a secret',
    cookie: {
        maxAge: 1000 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUnitialized: false,

    store: new knexSessionStore({
        knex: require('../database/db-config'),
        tablename: 'sessions',
        sidefieldname: 'sid',
        createTable: true,
        clearInterval: 1000 * 60 * 60
    })
};

module.exports = server => {

    server.use(express.json());
    server.use(helmet())
    server.use(session(sessionConfig))
    
  };