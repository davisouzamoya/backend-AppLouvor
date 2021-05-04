module.exports = {
  production: {
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
},
development: {
  client: 'pg',
  connection: {
    host: '192.168.99.100',
    port: '5432',
    user: 'postgres',
    password: '123',
    database: 'postgres'
  }, 
  migrations: {
    directory: './src/database/migrations'
  },
},
};
