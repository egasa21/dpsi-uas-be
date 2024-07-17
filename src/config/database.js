const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 26257,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: true,
    }
  },
  production: {
    dialect: 'postgres',
    host: 'your_production_host',
    port: 26257,
    username: 'your_production_username',
    password: 'your_production_password',
    database: 'your_production_database',
  },
};