import express from "express";

//import PointsController from './controllers/PointsController'
import IngredienteController from "./controllers/IngredienteController";

const routes = express.Router();

//const pointsController = new PointsController()
const IngredientesController = new IngredienteController();

//index, show , create, update ,delete
routes.get("/ingrediente", IngredientesController.index);
routes.get("/ingrediente/:id", IngredientesController.show);
routes.post("/ingrediente", IngredientesController.create);
routes.put("/ingrediente/:id", IngredientesController.update);
routes.delete("/ingrediente/:id", IngredientesController.delete);
// routes.get('/points',pointsController.index)

export default routes;
