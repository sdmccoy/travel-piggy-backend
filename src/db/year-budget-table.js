'use strict';

const client = require('./connect-db.js');
const {Router} = require('express');
//load the db on server start
function createNewYearBudgetTable(){
//create a table if table doesn't exist
  client.query(`
    CREATE TABLE IF NOT EXISTS yearbudget (
      user_id SERIAL REFERENCES users (user_id),
      year_id SERIAL PRIMARY KEY,
      year INTEGER NOT NULL,
      year_amount NUMERIC
    );`
  ).then( data => console.log('data year = ', data))
    .catch( error => console.log('error year = ', error));
}
createNewYearBudgetTable();

const yearBudgetRouter = module.exports = new Router();

//create new user
yearBudgetRouter.post('/newyear', (req, res, next) => {
  client.query(`
    INSERT INTO yearbudget(user_id, year_id, year, year_amount)
    VALUES ($1, $2, $3, $4);
    `,
    [
      req.body.user_id,
      req.body.year_id,
      req.body.year,
      req.body.year_amount
    ]
  )
    .then(() => {
      res.send('new year budget inserted');
    })
    .catch(next);
}
);
