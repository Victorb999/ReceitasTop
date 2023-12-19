import { Request, Response } from "express";
import knex from "../database/connection";

class IngredienteController {
  async index(request: Request, response: Response) {
    const ingredientes = await knex("ingrediente")
      .select("*")
      .orderBy("descricao");

    return response.json({ ingredientes });
  }

  async create(request: Request, response: Response) {
    const { descricao, unidade, quantidade, preco } = request.body;

    var dateFormat = require("dateformat");
    let data = dateFormat(new Date(), "mm/dd/yyyy");

    const trx = await knex.transaction();

    const ingrediente_request = {
      descricao,
      unidade,
      quantidade,
      preco,
      data: data,
    };

    const insertedIds = await trx("ingrediente").insert(ingrediente_request);

    const ingrediente_id = insertedIds[0];

    await trx.commit();

    return response.json({
      id: ingrediente_id,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const ingrediente = await knex("ingrediente").where("id", id).first();

    if (!ingrediente) {
      return response
        .status(400)
        .json({ message: "Não encontramos esse ingrediente." });
    }

    return response.json({ ingrediente });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { descricao, unidade, quantidade, preco } = request.body;

    var dateFormat = require("dateformat");
    let data = dateFormat(new Date(), "mm/dd/yyyy");

    try {
      const trx = await knex.transaction();

      const ingrediente_request = {
        descricao,
        unidade,
        quantidade,
        preco,
        data: data,
      };

      const update = await trx("ingrediente")
        .where("id", id)
        .update(ingrediente_request);

      await trx.commit();

      if (!update) {
        return response
          .status(400)
          .json({ message: "Não encontramos esse ingrediente." });
      }

      return response.json({
        update,
      });
    } catch (error) {
      return response.json({
        error,
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const itens = await knex("ingrediente_receita")
      .where("ingrediente_id", id)
      .del();
    const ingrediente = await knex("ingrediente").where("id", id).del();

    if (!ingrediente || !itens) {
      return response
        .status(400)
        .json({ message: "Não encontramos esse ingrediente." });
    }

    return response.json({ ingrediente });
  }
}
export default IngredienteController;
