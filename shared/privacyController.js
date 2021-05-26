const jwt = require('jsonwebtoken');

const { secret } = require('./config');
module.exports = function (req, res, next) {
  try {
    console.log('we are in privacy module');
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: 'U are not authorized' });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(error);

    return res.status(403).json({ message: 'U are not authorized' });
  }
};
