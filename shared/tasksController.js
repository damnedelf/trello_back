const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { secret } = require('./config');

const Tasks = require('../test_models/tasks');

class TasksController {
  async create(req, res) {
    const token = req.headers.authorization;
    const decodedData = jwt.verify(token, secret);
    try {
      const errors = validationResult(req);
      if (errors.errors.length) {
        console.log('error', req.body);

        return res
          .status(400)
          .json({ message: 'Cannot create this table', errorNames: errors });
      }

      const { title, text, story, tableId, priority } = req.body;
      const task = await Tasks.create({
        title,
        text,
        story,
        priority,
        tableId,
        creatorId: decodedData.id,
      });

      return res.status(200).json({
        task,
        message: 'task has been successfully registered',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'task`s creation error' });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const task = await Tasks.findAll({
        where: { tableId: id },
      });

      if (!task) {
        return res.status(204).json({
          message: 'No Tasks',
        });
      }

      return res.json(task);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Read task error' });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, text, story, priority } = req.body;
      await Tasks.update(
        { title, text, story, priority },
        {
          where: { id: id },
        }
      );

      res.status(200).json({ message: 'Task updated' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Update Task error' });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await Tasks.destroy({
        where: { id: id },
      });

      res.status(204).json({ message: 'Task has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Delete Task error' });
    }
  }
}
module.exports = new TasksController();
