const crypto =  require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
  
  async create(request, response){
    try{
      
      return response.json()
    }catch(err){
      return response.status(400).json({error:err.message})
    }
    
    
  }
  
}


