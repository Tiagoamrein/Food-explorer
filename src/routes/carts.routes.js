const { Router } = require("express");
const CartsController = require("../Controllers/CartsController");
const authenticated = require("../middleware/Authenticated");
const isAdmin = require("../middleware/isAdmin");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.use(authenticated);

cartsRoutes.post("/", cartsController.create);
cartsRoutes.get("/:id", cartsController.show);
cartsRoutes.get("/",isAdmin, cartsController.index);
cartsRoutes.delete("/:id", cartsController.delete);
cartsRoutes.put("/", cartsController.update);


module.exports = cartsRoutes;