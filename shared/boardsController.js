const { validationResult } = require('express-validator');

const Boards = require('../test_models/boards');
const Tables = require('../test_models/tables');
const usersBoards = require('../test_models/users_boards');
const jwt = require('jsonwebtoken');

const { secret } = require('./config');

class BoardsController {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (errors.errors.length) {
        console.log('error', req.body);

        return res
          .status(400)
          .json({ message: 'Cannot create this board', errorNames: errors });
      }

      const { name, ownerId } = req.body;
      const board = await Boards.create({
        name: name,
        ownerId: ownerId,
      });
      await Tables.create({
        name: 'Tasks',
        boardId: board.id,
        order: 1,
      });
      await Tables.create({
        name: 'Reminder',
        boardId: board.id,
        order: 2,
      });
      return res.status(200).json({
        board,
        message: 'Board and Default tables has been successfully registered',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Board`s creation error' });
    }
  }

  async read(req, res) {
    try {
      const token = req.headers.authorization;
      const decodedData = jwt.verify(token, secret);
      const board = await Boards.findAll({
        where: { ownerId: decodedData.id },
      });

      if (!board) {
        return res.status(204).json({
          message: 'No Boards',
        });
      }

      return res.json(board);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Read Board error' });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Boards.update(
        { name: name },
        {
          where: { id: id },
        }
      );

      res.status(200).json({ message: 'Board updated' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Update board error' });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await Boards.destroy({
        where: { id: id },
      });

      res.status(204).json({ message: 'Board has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Delete board error' });
    }
  }
}
module.exports = new BoardsController();
