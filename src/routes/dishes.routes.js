const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../Controllers/DishesController");
const authenticated= require("../middleware/Authenticated");
const isAdmin = require("../middleware/isAdmin");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(authenticated);

dishesRoutes.post("/", isAdmin, upload.single("image"), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", isAdmin, upload.single("image"), dishesController.update);
dishesRoutes.delete("/:id", isAdmin, dishesController.delete);

module.exports = dishesRoutes;