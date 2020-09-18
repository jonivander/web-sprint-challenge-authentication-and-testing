const db = require('../database/dbConfig');

module.exports = {
    add, 
    find, 
    findBy,
    findById,
}; 

function find() {
    return db('users').select('id', 'username').orderBy('id');
};

function findBy(filter) {
    return db("users").where(filter).orderBy("id");
}; 

function add(user) {
    return db("users").insert(user).then(info => {
        return findById(info[0]); 
     })
 }

function findById(id) {
    return db('users').where({ id }).first();
}