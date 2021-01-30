import { Request, Response } from "express";
import knex from "../database/connection";

class IngredienteController {
  async index(request: Request, response: Response) {
    const ingrediente = await knex("ingrediente").select("*");

    const Ingrediente = ingrediente.map(item => {
      return {
        item
      };
    });

    return response.json({ Ingrediente });
  }

  async create(request: Request, response: Response) {
    const { descricao, unidade, quantidade, preco } = request.body;
    console.log(request.body);

    var dateFormat = require("dateformat");
    let data = dateFormat(new Date(), "dd/mm/yyyy");

    const trx = await knex.transaction();

    const ingrediente_request = {
      descricao,
      unidade,
      quantidade,
      preco,
      data: data
    };
    console.log(ingrediente_request);

    const insertedIds = await trx("ingrediente").insert(ingrediente_request);

    const ingrediente_id = insertedIds[0];

    await trx.commit();

    return response.json({
      id: ingrediente_id
    });
  }
}
export default IngredienteController;
