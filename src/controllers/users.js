const crypto =  require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

const authConfig = require('../config/auth')

module.exports = {
  async index(request, response){
    try{
      console.log('------------- Nova consulta ------------')
      const { email,password } = request.headers
      
      const user = await connection('users').select('*').where({email})
      
      if (!user) {
        response.status(400).json({error:'Usuario não encontrado'})
      }

      if(!user[0].active) {
        response.status(400).json({error:'Usuario desativado'})
      }

      console.log('------------------------------------------')
      console.log('--------passwordMatche -------------------')
      console.log('------------------------------------------')
      const passwordMatched = await bcrypt.compare(password, user[0].password);
      
      if (!passwordMatched) {   
        response.status(400).json({error:'Senha incorreta'})
      }

      user[0].password = undefined;

      const token = jwt.sign({id:user[0].id}, authConfig.secret)

      return response.json({
        id:user[0].id,
        userFunction:user[0].funcao,
        name:user[0].nome,
        token
      })
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  },
  async create(request, response){
    try{
      const { 
        nome,
        email,
        instrumento,
        nascimento,
        phone,
        funcao,
        active,
        password
    } = request.body;

    console.log('------------------------------------------')
    console.log(request.body)
    console.log('------------------------------------------')
    
        
      const id = crypto.randomBytes(4).toString('HEX')
      const hashedPassowrd = await bcrypt.hash(password, 10)

      await connection('users').insert({
        id,
        nome,
        email,
        instrumento,
        nascimento,
        phone,
        funcao,
        active,
        password:hashedPassowrd
      })

      delete password;

      const token = jwt.sign({id:user[0].id}, authConfig.secret)
    
      return response.status(200).send('Cadastro realizado com sucesso!')
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  },
  async delete(request, response){
    try{
      const { id } = request.params;

      const users = await connection('musics')
        .where('id',id)
        .select('id')
        .first();
        
       await connection('users').where('id',id).delete();
        
       return response.status(204).send()
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  },
  async put(request,response){
    try{
      const { id } = request.params
      const { 
        nome, 
        email, 
        instrumento, 
        nascimento, 
        password,
        funcao
       } = request.body
  
       await connection('users')
       .where('id',id)
       .update({
        'nome':nome, 
        'email':email, 
        'instrumento':instrumento, 
        'nascimento':nascimento, 
        'password':password,
        'funcao':funcao
        });
    
      return response.status(204).send()
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  }
}


