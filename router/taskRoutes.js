const Router = require('express');
const { check } = require('express-validator');

const controller = require('../shared/tasksController');
const verifyToken = require('../shared/privacyController');
const taskRouter = new Router();

taskRouter.post(
  '/tasks/',
  verifyToken,
  [
    check('title', 'Task title cannot be empty').notEmpty(),
    check('tableId', 'tableId cannot be empty').notEmpty(),
  ],

  controller.create
);
taskRouter.get('/tasks/:id', verifyToken, controller.read);
taskRouter.put('/tasks/:id', verifyToken, controller.update);
taskRouter.delete('/tasks/:id', verifyToken, controller.delete);

module.exports = taskRouter;
