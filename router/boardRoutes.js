const Router = require('express');
const { check } = require('express-validator');

const controller = require('../shared/boardsController');
const verifyToken = require('../shared/privacyController');
const boardsRouter = new Router();

boardsRouter.post(
  '/boards/',
  verifyToken,
  [
    check('name', 'Board name cannot be empty').notEmpty(),
    check('ownerId', 'ownerId cannot be empty').notEmpty(),
  ],

  controller.create
);
boardsRouter.get('/boards/', verifyToken, controller.read);
boardsRouter.put('/boards/:id', verifyToken, controller.update);
boardsRouter.delete('/boards/:id', verifyToken, controller.delete);

module.exports = boardsRouter;
