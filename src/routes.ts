import express from "express";

import ReceitaController from './controllers/ReceitaController'
import IngredienteController from "./controllers/IngredienteController";

const routes = express.Router();

const receitaController = new ReceitaController()
const IngredientesController = new IngredienteController();

//index, show , create, update ,delete
routes.get("/ingrediente", IngredientesController.index);
routes.get("/ingrediente/:id", IngredientesController.show);
routes.post("/ingrediente", IngredientesController.create);
routes.put("/ingrediente/:id", IngredientesController.update);
routes.delete("/ingrediente/:id", IngredientesController.delete);

routes.post('/receita',receitaController.create)

export default routes;
