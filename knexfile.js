// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL+ `?ssl=true`
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
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
