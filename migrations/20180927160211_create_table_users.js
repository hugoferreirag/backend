
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.varchar('telefones', 'varchar ARRAY').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.timestamp('data_criacao').notNull()
        table.timestamp('data_atualizacao').notNull()
        table.timestamp('ultimo_login').notNull()
        table.varchar('token_acessoAPI').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
