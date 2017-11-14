'use strict';

const client = require('./connect-db.js');
const {Router} = require('express');
//load the db on server start
function createNewUserTable(){
//create a table if table doesn't exist
  client.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      token VARCHAR(255) NOT NULL,
      "email" VARCHAR(100) NOT NULL
    );`
  ).then( () => console.log('user table created'))
    .catch(error => console.log('error = ', error));
}
createNewUserTable();

const userRouter = module.exports = new Router();

//create new user
userRouter.post('/new-user', (req, res, next) => {

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
    .then(() => {
      res.send('new user inserted');
    })
    .catch(next);
}
);
