const knex = require("../database")
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')
class UsersController {

  async create(req, res){
    const {name, email, password} = req.body

    const userExists = await knex("users").where({ email }).first();
    
    if (!email || !password|| !name) {
      throw new AppError('Preencha todos os campos');
    }

    if(userExists){
      
      throw new AppError("Email ja cadastrado")
      
    }
    if(password.length < 8){
      throw new AppError("Use pelo menos 8 caracteres")
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    })
    res.status(201).json()
  }


  async delete(req, res) {
    const { id } = req.params;
    await knex("users").where({ id }).delete();
    return res.status(202).json();
  }


  async update (request, response){
    const {name, email, password, old_password} = request.body
    const  user_id  = request.user.id;
  
      const user = await knex("users").where({id: user_id  }).first();
  
      if (!user) {
        throw new Error("Usuário não encontrado!");
      }
  
  
    const userWithUpdatedEmail = await knex("users").where({ email }).first();
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new Error("E-mail já cadastrado!");
    }
    
    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha'
      )
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
  
      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }
      user.password = await hash(password, 8);
     
    } 
    
    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password
    });

  await knex("users").where({ id: user_id }).update('updated_at', knex.fn.now());

  
        return response.status(201).json();
      }

}

module.exports = UsersController