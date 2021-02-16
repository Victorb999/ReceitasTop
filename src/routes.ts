import express from "express";

import ReceitaController from './controllers/ReceitaController'
import IngredienteController from "./controllers/IngredienteController";

const routes = express.Router();

const receitaController = new ReceitaController()
const ingredientesController = new IngredienteController();

//index, show , create, update ,delete
routes.get('/', function(req, res) {
  res.send('hello world');
});
routes.get("/ingrediente", ingredientesController.index);
routes.get("/ingrediente/:id", ingredientesController.show);
routes.post("/ingrediente", ingredientesController.create);
routes.put("/ingrediente/:id", ingredientesController.update);
routes.delete("/ingrediente/:id", ingredientesController.delete);

routes.post("/ingredienteReceita/:id", receitaController.removeIngredientes);

routes.post('/receita',receitaController.create);
routes.get('/receita/:id',receitaController.show);
routes.get('/receita/',receitaController.index);
routes.put("/receita/:id", receitaController.update);
routes.delete('/receita/:id',receitaController.delete);

export default routes;
