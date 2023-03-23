const { Router } = require("express")

const usersRoutes = Router();
const UsersController = require("../Controllers/UsersController")
const authenticated =  require("../middleware/Authenticated")

const userController = new UsersController();

usersRoutes.post("/", userController.create)
usersRoutes.delete("/:id", userController.delete)
usersRoutes.put("/",authenticated, userController.update)

module.exports = usersRoutes