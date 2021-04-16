const knex = require('knex')
const knexConfig = require('../../knexfile')
const environment = process.env.DB_ENV || 'development';
// const connection = knex(configuration.development)

// module.exports = connection;
module.exports = knex(knexConfig[environment]);