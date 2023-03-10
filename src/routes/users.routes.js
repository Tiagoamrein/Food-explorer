const { Router } = require("express")

const usersRoutes = Router();
const UsersController = require("../Controllers/UsersController")

const userController = new UsersController();

usersRoutes.post("/", userController.create)


module.exports = usersRoutes