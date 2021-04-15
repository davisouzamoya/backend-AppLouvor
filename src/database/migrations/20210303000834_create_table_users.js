
exports.up = function(knex) {
  return knex.schema.createTable('users',function(table){
    table.string('id');
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('instrumento').notNullable();
    table.date('nascimento').notNullable();
    table.string('phone',11).notNullable();
    table.string('funcao').notNullable();
    table.boolean('active').notNullable();
    table.string('password').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
