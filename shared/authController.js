const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../test_models/users');
const Users = require('../models/users');
const { secret } = require('./config');

const salt = 5;

const generateAccessToken = (id) => {
  const payload = { id };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (errors.errors.length) {
        console.log('error', req.body);

        return res
          .status(400)
          .json({ message: 'Registration error', errorNames: errors });
      }

      const { name, email, password } = req.body;
      const candidate = await User.findOne({
        where: { name: name },
      });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this name is exist already' });
      }
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      return res.json({ message: 'User has been successfully registered' });
    } catch (error) {
      console.log(e);
      res.status(400).json({ message: 'Registartion error' });
    }
  }

  async login(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({
        where: { name: name },
      });

      if (!user) {
        return res.status(400).json({
          message:
            'U are not registered. Cannot log in. Please register first.',
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: 'Login or password is incorrect' });
      }
      const token = generateAccessToken(user.id);
      const id = user.id;

      return res.json({ token, id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async getUsers(req, res) {
    try {
      let person = await User.create({
        name: 'Pepiskin3',
        email: 'zalupkin@pipiskin.com',
      });
      //   res.send('person');
      //   res.end();
      console.log(person);
      res.json('caught');
    } catch (error) {
      console.log(e);
      res.status(400).json({ message: 'Registartion error' });
    }
  }
  async getCreds(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({ message: 'U are not authorized' });
      }
      const decodedData = jwt.verify(token, secret);
      req.user = decodedData;
      return res.json({ decodedData });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new AuthController();
