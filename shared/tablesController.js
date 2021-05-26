const { validationResult } = require('express-validator');

const Tables = require('../test_models/tables');
const Tasks = require('../test_models/tasks');

class TablesController {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (errors.errors.length) {
        console.log('error', req.body);

        return res
          .status(400)
          .json({ message: 'Cannot create this table', errorNames: errors });
      }

      const { name, boardId } = req.body;
      const table = await Tables.create({
        name: name,
        boardId: boardId,
      });

      return res.status(200).json({
        table,
        message: 'Table has been successfully registered',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Table`s creation error' });
    }
  }

  async read(req, res) {
    console.log(req.params);
    console.log(req.body);
    try {
      const { id } = req.params;
      const tables = await Tables.findAll({
        where: { boardId: id },
      });

      if (!tables) {
        return res.status(204).json({
          message: 'No Tables',
        });
      }
      let resTables = [];
      for (let table of tables) {
        console.log('--------------------------------');
        console.log(table.dataValues);
        console.log('--------------------------------');
        let tasks = await Tasks.findAll({ where: { tableId: table.id } });
        resTables.push({ id: table.id, name: table.name, tasks });
      }

      console.log('--------------------------------');
      console.log(resTables);
      return res.json(resTables);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Read Table error' });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Tables.update(
        { name: name },
        {
          where: { id: id },
        }
      );

      res.status(200).json({ message: 'Table updated' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Update Table error' });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await Tables.destroy({
        where: { id: id },
      });

      res.status(204).json({ message: 'Table has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Delete Table error' });
    }
  }
}
module.exports = new TablesController();
