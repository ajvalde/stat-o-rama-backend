
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table){
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('password');
      table.string('summoner_name');
      table.string('battle_tag');
  })
};

exports.down = function(knex, Promise) {
  
};
