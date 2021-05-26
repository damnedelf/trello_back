const Router = require('express');
const { check } = require('express-validator');

const controller = require('../shared/tablesController');
const verifyToken = require('../shared/privacyController');
const tableRouter = new Router();

tableRouter.post(
  '/tables/',
  verifyToken,
  [
    check('name', 'Table name cannot be empty').notEmpty(),
    check('boardId', 'boardId cannot be empty').notEmpty(),
  ],

  controller.create
);
tableRouter.get('/tables/:id', verifyToken, controller.read);
tableRouter.put('/tables/:id', verifyToken, controller.update);
tableRouter.delete('/tables/:id', verifyToken, controller.delete);

module.exports = tableRouter;
