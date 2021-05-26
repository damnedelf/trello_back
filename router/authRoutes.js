const Router = require('express');
const { check } = require('express-validator');

const controller = require('../shared/authController');

const authRouter = new Router();

authRouter.post(
  '/users/registration',
  [
    check('name', 'User name cannot be empty').notEmpty(),
    check('name', 'User name cannot be less the 3 symbols').isLength({
      min: 3,
    }),
    check('email', 'Email field must be valid').isEmail(),
    check('password', 'Password length must be at least 6 symbols').isLength({
      min: 6,
      max: 20,
    }),
  ],

  controller.registration
);
authRouter.post('/users/login', controller.login);
authRouter.get('/users/getcreds', controller.getCreds);
// authRouter.get('/users', controller.getUsers);

module.exports = authRouter;
