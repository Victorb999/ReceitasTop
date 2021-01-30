import Knex from 'knex'

export async function up(knex : Knex){
    //CRIAR TABELA
    return knex.schema.createTable('ingrediente',table =>{
        table.increments('id').primary()
        table.string('descricao').notNullable()
        table.string('unidade').notNullable()
        table.float('quantidade').notNullable()
        table.float('preco').notNullable()
        table.date('data').notNullable()
    })
}

export async function down(knex : Knex){
    //VOLTAR ATRAS (DELETAR TABELA)
    return knex.schema.dropTable('ingrediente')
}