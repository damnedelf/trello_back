import { NextFunction, Request, Response } from 'express';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

const router = require('./router/userRoutes');
const db = require('./db/index');
const port = process.env.PORT;
const server = http.createServer(app);

db.authenticate()
  .then(() => console.log(`db connected`))
  .catch((err) => console.log(`error: ${err.message}`));

let jsonParser = bodyParser.json();

app.use(cors());
app.use('/api/', jsonParser, router);

app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(err.status);
    res.json({ error: err.message });
  }
});
app.get('*', (req, res) => {
  res
    .status(404)
    .send(`<h1> Page http://localhost${req.url} doesn\`t exist</h1>`);
});

server.listen(
  port,
  process.env.URL,
  console.log(`server up===>>>>>${process.env.URL}:${port} `)
);
module.exports = server;
