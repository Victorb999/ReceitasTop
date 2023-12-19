import { Request, Response } from "express";
import knex from "../database/connection";

class ReceitaController {
  async create(request: Request, response: Response) {
    const { receita, ingredientes } = request.body;

    var dateFormat = require("dateformat");
    const data = dateFormat(new Date(), "mm/dd/yyyy");

    const trx = await knex.transaction();
    var valor = 0;
    const receitaOBJ = {
      descricao: receita.descricao,
      valor_total: valor,
      data: data,
    };

    const insertedIds = await trx("receita").returning("id").insert(receitaOBJ);
    const receita_id = insertedIds[0];

    await trx.commit();

    interface Ingrediente {
      id: number;
      descricao: string;
      unidade: string;
      quantidade: number;
      preco: number;
      data: Date;
    }
    // interface ingrediente_receita {
    //   id?: number;
    //   quantidade?: number;
    //   preco?: number;
    //   ingrediente_id:number;
    //   receita_id: number;
    // }

    ingredientes.map(async (item: Ingrediente) => {
      const ingrediente = await knex("ingrediente")
        .where("id", item.id)
        .first();

      if (!ingrediente) {
        return response
          .status(400)
          .json({ message: "Não encontramos esse ingrediente." });
      }

      const preco_calculado =
        (item.quantidade * ingrediente.preco) / ingrediente.quantidade;

      const ingrediente_receita = {
        ingrediente_id: item.id,
        receita_id: receita_id,
        data: data,
        quantidade: item.quantidade,
        preco: preco_calculado,
      };

      //const trx = await knex.transaction();

      await knex("ingrediente_receita").insert(ingrediente_receita);

      //await trx.commit();

      //const trx2 = await knex.transaction();
      await knex("receita")
        .where("id", receita_id)
        .update({
          valor_total: knex.raw("?? + " + preco_calculado, ["valor_total"]),
        });
      //await trx2.commit();
    });

    return response.json({
      id: receita_id,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const receita = await knex("receita").where("id", id).first();

    if (!receita) {
      return response.status(400).json({ message: "Receita não encontrada." });
    }

    const ingredientes = await knex("ingrediente")
      .join(
        "ingrediente_receita",
        "ingrediente.id",
        "=",
        "ingrediente_receita.ingrediente_id",
      )
      .where("ingrediente_receita.receita_id", id)
      .select(
        "ingrediente.id",
        "ingrediente.descricao",
        "ingrediente_receita.preco",
        "ingrediente_receita.quantidade",
      );

    return response.json({ receita, ingredientes });
  }

  async index(request: Request, response: Response) {
    const receitas = await knex("receita").select("*").orderBy("descricao");

    return response.json({ receitas });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const itens = await knex("ingrediente_receita")
      .where("receita_id", id)
      .del();
    const receita = await knex("receita").where("id", id).del();

    if (!receita || !itens) {
      return response
        .status(400)
        .json({ message: "Não encontramos esse ingrediente." });
    }

    return response.json({ receita });
  }

  async removeIngredientes(request: Request, response: Response) {
    const { id } = request.params;
    const { Ingredientes } = request.body;

    interface Ingrediente {
      id: number;
      descricao: string;
      unidade: string;
      quantidade: number;
      preco: number;
      data: Date;
    }
    Ingredientes.map(async (item: Ingrediente) => {
      const itens = await knex("ingrediente_receita")
        .where("receita_id", id)
        .where("ingrediente_id", item.id)
        .del();

      if (!itens) {
        return response
          .status(400)
          .json({ message: "Não encontramos esse ingrediente." });
      }
    });

    const receita = await knex("receita").where("id", id).first();

    return response.json({ receita });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { descricao } = request.body;

    var dateFormat = require("dateformat");
    let data = dateFormat(new Date(), "dd/mm/yyyy");

    try {
      const trx = await knex.transaction();

      const ingrediente_request = {
        descricao,
        data: data,
      };

      const update = await trx("receita")
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
}

export default ReceitaController;
