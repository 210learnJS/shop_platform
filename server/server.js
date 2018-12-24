
const Koa = require('koa');
const Logger = require('koa-logger');
const Bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const constant = require('./constants/constant.js');
const route = require('./route.js');
const SERVER_PORT = constant.SERVER_PORT;
const app = new Koa();

app.use(Logger());
app.use(Bodyparser());
app.use(route.routes());
app.use(static(
  path.join( __dirname,  '../client')
));

app.listen(SERVER_PORT);
console.log("server start at http://localhost:"+SERVER_PORT);