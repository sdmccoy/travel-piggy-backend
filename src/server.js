'use strict';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const corsOrigins = process.env.CORS_ORIGINS;

const app = express();
//set up morgan logging with the dev format
app.use(morgan('dev'));
//configure cors origins so no cross site errors
app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

app.use(bodyParser.json());
//require in route files here with app.use
app.use(require('./db/user-table.js'));
app.use(require('./db/year-budget-table.js'));
//wildcard catch all if route doesnt exist
app.all('/*', (req, res) => {
  res.sendStatus(404);
});

//export object to start and stop server
const server = module.exports = {};
//set isOn key to the server to toggle (this technically doesnt work)
server.isOn = false;
//set value of start to a function that starts the server
server.start = () => {
  return new Promise((resolve, reject) => {
    //if value of isOn equals false, start the server.
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('\n Server running on PORT: ', process.env.PORT);
        //resolve to end promise
        resolve();
      });
      return;
    }
    reject(new Error('\n Server is already running'));
  });
};
console.log('server obj = ', server);
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn && server.http){
      console.log('serverhttp = ', server.http);
      return server.http.close(() => {
        server.isOn = false;
        console.log('Server shut down');
        resolve();
      });
    }
    reject(new Error('Server is already off'));
  });
};
