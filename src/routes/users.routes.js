const { Router } = require("express")


const UsersController = require("../Controllers/UsersController")
const authenticated =  require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();
const userController = new UsersController();

usersRoutes.post("/", userController.create)
usersRoutes.delete("/:id", userController.delete)
usersRoutes.put("/",authenticated, userController.update)

module.exports = usersRoutes