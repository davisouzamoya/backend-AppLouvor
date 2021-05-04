const express = require('express');
const music =  require('./controllers/music');
const users =  require('./controllers/users');
const routes = express.Router();
const connection = require('./database/connection');
const jwt =  require('jsonwebtoken');
const authConfig = require('./config/auth.json')


async function validToken(request,response,next){
  console.log('validToken')
  const authHeader = request.headers.authorization
  console.log(authHeader)
  if(!authHeader)
    return response.status(401).send({ err:'Token não informado'})
  
  const parts = authHeader.split(' ')

  if(!parts.length === 2)
    return response.status(401).send({ error: 'Token com erro'})

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token malformatted'})

  jwt.verify(token, authConfig.secret, (err,decoded)=>{
    if(err) return response.status(401).send({ error: 'Token invalido'})

    response.userId = decoded.id;
    console.log('-- Next()')
    return next()  
  })
}

async function validCreate(request,response,next){
  console.log('------------------------------------------------')
  const { artist, title } = request.body
  console.log('artist: '+artist)
  console.log('title: '+title)
  
  const returnMusic = await connection('musics')
  .select([
      'artist',
      'title'
    ])
  .where({artist,title})

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
routes.delete('/users/:id',validToken,users.delete)
routes.put('/users/:id',validToken,users.put)

routes.get('/music',music.index)
routes.post('/music',validToken,validCreate,music.create)
routes.put('/music',validToken,music.put)
routes.delete('/music',validToken,music.delete)

module.exports = routes;

