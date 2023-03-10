const knex = require("../database")
const AppError = require('../utils/AppError')
class UsersController {

  async create(req, res){
    const {name, email, password} = req.body

    const userExists = await knex("users").where({ email }).first();

    if(userExists){
      console.log("email em uso")

    }
    await knex("users").insert({
      name,
      email,
      password
    })
    res.status(201).json()
  }
}

module.exports = UsersController