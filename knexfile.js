// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://dzeqfhzdsjivzv:397ea716567017b157e3706e8fd8ec3f826b136875dca0f088a49be8c30bce9d@ec2-18-233-83-165.compute-1.amazonaws.com:5432/ddkfo5ttqbjup0', 
    migrations: {
      directory: './src/database/migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: 'postgres://dzeqfhzdsjivzv:397ea716567017b157e3706e8fd8ec3f826b136875dca0f088a49be8c30bce9d@ec2-18-233-83-165.compute-1.amazonaws.com:5432/ddkfo5ttqbjup0', 
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://dzeqfhzdsjivzv:397ea716567017b157e3706e8fd8ec3f826b136875dca0f088a49be8c30bce9d@ec2-18-233-83-165.compute-1.amazonaws.com:5432/ddkfo5ttqbjup0', 
    // connection: {
      // database: 'my_db',
      // user:     'username',
      // password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
