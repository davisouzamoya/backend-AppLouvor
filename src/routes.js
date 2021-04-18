const express = require('express');
const music =  require('./controllers/music');
const users =  require('./controllers/users');
const routes = express.Router();
const connection = require('./database/connection');

async function validCreate(request,response,next){
  console.log('validateCreate')
  const { artist, title } = request.body

  const returnMusic = await connection('musics')
  .select([
      'artist',
      'title'
    ])
  .where({
          'artist':artist,
          'title':title
        })

  if(returnMusic.length > 0){
    return response.status(401).json({ error:'Music already registered'})
  }else{
    return next()  
  }
}

async function validUser(request,response,next){
  const { email } = request.body

  const returnUser = await connection('users')
  .select(['email']).where({email})

  if(returnUser.length > 0){
    return response.status(401).json({ error:'User already registered'})
  }else{
    return next()  
  }
}

routes.get('/users',users.index)
routes.post('/users',validUser,users.create)
routes.delete('/users/:id',users.delete)
routes.put('/users/:id',users.put)

routes.get('/music',music.index)
routes.post('/music',validCreate,music.create)
routes.put('/music',music.put)
routes.delete('/music',music.delete)

module.exports = routes;

