
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
              knex('users').insert({name: 'Anthony',email: 'ajv@ajv.com', password: '1234',summoner_name:'synstar',battle_tag: 'Synstar-1557'})

        
      ]);
    });
};
