
exports.up = function(knex) {
  return knex.schema.createTable('musics',function(table){
    table.string('id');
    table.string('approver')
    table.boolean('valid')
    table.string('artist').notNullable();
    table.string('title').notNullable();
    table.string('url').notNullable();
    table.specificType('lyrics','text ARRAY').notNullable();
    
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('musics')
};
