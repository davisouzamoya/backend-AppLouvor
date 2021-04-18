const crypto =  require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response,next){
    try{
      const { artist, title } = request.headers
      let musics;
      console.log('artist: '+artist)
      console.log('title: '+title)

      // if(artist){
      //    musics = await connection('musics').select('lyrics').where({artist, title})  
      // }else{
      //   musics = await connection('musics')  
      // }
      
      return response.json(request.headers)
    }catch(err){
      return response.status(400).json({error:err.message})
    }
    
  },
  async create(request, response){
    try{
      const { 
        valid,
        artist,
        title,
        url,
        lyrics
      } = request.body;

      const id = crypto.randomBytes(4).toString('HEX')
  
      // await connection('musics').insert({
      //   id,
      //   valid,
      //   artist,
      //   title,
      //   url,
      //   lyrics
      // })
      const valotes = {
        id,
        valid,
        artist,
        title,
        url,
        lyrics
      }
        
  
      return response.json(valotes)
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  },
  async put(request,response){
    try{
      const { artist, title, approver, lyrics,valid} = request.body
      console.log('------------------ INIT -----------------------')
      console.log('-----------------------------------------------')
      console.log(request.body)
      console.log('-----------------------------------------------')

      const users = await connection('musics').where({title,artist}).update({approver,valid,lyrics});
      console.log(users)
      
      console.log('Musica aprovada!')
      return response.json('Musica aprovada!')
    }catch(err){
      console.log('Error!')
      return response.status(400).json({error:err.message})
    }
  },
  async delete(request, response){
    try{
      const { artist, title } = request.headers
      
      const music = await connection('musics')
        .where({title,artist})
        .delete();
      
        return response.json('Musica excluida com sucesso!')
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  }
}

