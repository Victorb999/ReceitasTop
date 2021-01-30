import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("ingrediente").insert([
    { descricao: "Farinha", preco: "5",quantidade: "1",unidade: "KG" ,data: "30/01/2021"},
    { descricao: "Leite", preco: "3",quantidade: "1",unidade: "L" ,data: "30/01/2021"},
    { descricao: "Nescau", preco: "4",quantidade: "0.5",unidade: "KG" ,data: "30/01/2021"},
  ]);
}
