const Router = require('express');
const { check } = require('express-validator');

const controller = require('../shared/authController');
const verifyToken = require('../shared/privacyController');

const testRouter = new Router();

testRouter.get('/test', verifyToken, (req, res) => {
  console.log('caught');
  res.json({ message: 'HEre are some users' });
});

module.exports = testRouter;
