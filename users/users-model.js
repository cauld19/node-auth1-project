const db = require('../database/db-config');


module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db('users')
    .select('id', 'username');
  }

  function findBy(search) {
      return db('users')
        .select('id', 'username', 'password')
        .where(search)
  }

  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }

 
function add(user) {
    return db('users')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
          });
}
