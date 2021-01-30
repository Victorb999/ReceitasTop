import Knex from 'knex'

export async function up(knex : Knex){
    //CRIAR TABELA
    return knex.schema.createTable('receita',table =>{
        table.increments('id').primary()
        table.string('descricao').notNullable()
        table.float('valor_total').notNullable()
        table.date('data').notNullable()
    })
}

export async function down(knex : Knex){
    //VOLTAR ATRAS (DELETAR TABELA)
    return knex.schema.dropTable('receita')
}