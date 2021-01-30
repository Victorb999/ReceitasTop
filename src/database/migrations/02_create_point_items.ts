import Knex from 'knex'

export async function up(knex : Knex){
    //CRIAR TABELA
    return knex.schema.createTable('ingrediente_receita',table =>{
        table.increments('id').primary()
        table.float('preco').notNullable()
        table.date('data').notNullable()
        table.decimal('quantidade').notNullable()

        table.integer('ingrediente_id')
        .notNullable()
        .references('id')
        .inTable('ingrediente')

        table.integer('receita_id')
        .notNullable()
        .references('id')
        .inTable('receita')
    })
}

export async function down(knex : Knex){
    //VOLTAR ATRAS (DELETAR TABELA)
    return knex.schema.dropTable('ingrediente_receita')
}