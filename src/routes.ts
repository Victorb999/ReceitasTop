import express from 'express'

//import PointsController from './controllers/PointsController'
import IngredienteController from './controllers/IngredienteController'

const routes = express.Router()

//const pointsController = new PointsController()
const IngredientesController = new IngredienteController()

//index, show , create, update ,delete
routes.get('/ingrediente',IngredientesController.index)
routes.post('/ingrediente',IngredientesController.create)
// routes.get('/points/:id',pointsController.show)
// routes.get('/points',pointsController.index)

export default routes