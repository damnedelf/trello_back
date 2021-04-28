require('dotenv').config();
const { DB_LOGIN, DB_PASSWORD, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_LOGIN,
    password: DB_PASSWORD,
    database: 'database_development',
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_LOGIN,
    password: DB_PASSWORD,
    database: 'database_test',
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: DB_LOGIN,
    password: DB_PASSWORD,
    database: 'database_production',
    host: DB_HOST,
    dialect: 'postgres',
  },
};
