// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: 'postgres://dzeqfhzdsjivzv:397ea716567017b157e3706e8fd8ec3f826b136875dca0f088a49be8c30bce9d@ec2-18-233-83-165.compute-1.amazonaws.com:5432/ddkfo5ttqbjup0',
    migrations: {
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
