// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL
    },
    migrations: {
      tableName: 'knex_migrations'
    },
},
  development: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }
};
