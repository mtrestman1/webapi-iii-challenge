const express = require('express');
const helmet = require('helmet');

const server = express();

const postsrouter = require('./data/routers/posts-routers')
const usersrouter = require('./data/routers/user-routers')


server.use(express.json());
server.use(helmet());

server.use('/api/posts', postsrouter)
server.use('/api/users', usersrouter)


// server.get('/', (req, res) => {
//     res.status(201).json('Working')
// })


module.exports = server;