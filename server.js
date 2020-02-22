const express = require('express');
const cors = require('cors');
const projectRouter = require('./middleware/projectRouter');
const actionRouter = require('./middleware/actionRouter');

const server = express();
server.use(cors());

server.use(express.json());
server.use('/api/projects', logger, projectRouter);
server.use('/api/actions', logger, actionRouter);

server.get('/', (req, res) => {
  res.send(`<h1>You made it this far.</h1>`);
});

//logger middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  )
  next();
}

module.exports = server;