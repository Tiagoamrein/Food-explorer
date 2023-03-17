const { Router } = require("express")

const usersRoutes = Router();
const UsersController = require("../Controllers/UsersController")

const userController = new UsersController();

usersRoutes.post("/", userController.create)
usersRoutes.delete("/:id", userController.delete)
usersRoutes.put("/:id", userController.update)

module.exports = usersRoutes