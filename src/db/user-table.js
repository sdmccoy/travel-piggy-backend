'use strict';

const client = require('./connect-db.js');
//load the db on server start
function loadDB(){
//create a table if table doesn't exist
  client.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      token VARCHAR(255) NOT NULL,
      "email" VARCHAR(100) NOT NULL
    );`
  ).then( data => console.log('data = ', data))
    .catch( error => console.log('error = ', error));
}
loadDB();
