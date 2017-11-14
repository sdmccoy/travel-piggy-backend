'use strict';

const pg = require('pg');
// const {Pool} = require('pg');
// console.log('pool = ', Pool);
//configure PostgreSQL connection here
const conString = 'postgres://postgres:1234@localhost:5432/travelpiggy';
//create new pg client with constring connection.
const client = new pg.Client(conString);
client.connect();
//using the client object and the connect method to connect.
module.exports = client;
