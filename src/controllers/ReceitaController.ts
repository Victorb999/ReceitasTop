import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const { Receita, Ingredientes } = request.body;
    
    var dateFormat = require("dateformat");
    const data = dateFormat(new Date(), "dd/mm/yyyy");

    const trx = await knex.transaction();
    let valor = 0;
    const receita = {
      descricao: Receita.descricao,
      valor_total: valor,
      data: data
    };

    const insertedIds = await trx("receita").insert(receita);

    const receita_id = insertedIds[0];

    Ingredientes.map(async item => {
      const ingrediente = await knex("ingrediente")
        .where("id", item.id)
        .first();

      if (!ingrediente) {
        return response
          .status(400)
          .json({ message: "Não encontramos esse ingrediente." });
      }

      console.log(ingrediente);

      const preco_calculado =
        (item.quantidade * ingrediente.preco) / ingrediente.quantidade;

      const ingrediente_receita = {
        ingrediente_id: item.id,
        receita_id: receita_id,
        data: data,
        quantidade: item.quantidade,
        preco: preco_calculado
      };
      valor += preco_calculado;

      const inserted = await trx("ingrediente_receita").insert(
        ingrediente_receita
      );
    });

    await knex("receita").where("id", receita_id).update({
      valor_total: valor,
      thisKeyIsSkipped: undefined
    });

    await trx.commit();

    return response.json({
      id: receita_id
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map(item => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(points);
  }
}

export default PointsController;
