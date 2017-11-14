'use strict';

const client = require('./connect-db.js');
// console.log('newdb = ', newDB);
// const client = newDB.connect();
console.log('client = ', client);
const {Router} = require('express');
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

const userRouter = module.exports = new Router();

//create new user
userRouter.post('/user', (req, res, next) => {
  console.log('req.body = ', req.body);

  client.query(`
    INSERT INTO users(user_id, token, "email")
    VALUES ($1, $2, $3);
    `,
    [
      req.body.user_id,
      req.body.token,
      req.body.email
    ]
  )
    .then(result => {
      res.send('new user inserted');
      console.log('res = ', res.body);
    })
    .catch(next);
}
);
