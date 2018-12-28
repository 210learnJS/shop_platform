
const Koa = require('koa');
const Logger = require('koa-logger');
const Bodyparser = require('koa-bodyparser');
const path = require('path');
const static = require('koa-static');
const koaBody = require('koa-body');

const constant = require('./constants/constant.js');
const route = require('./route.js');

const SERVER_PORT = constant.SERVER_PORT;

const app = new Koa();
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../client';

app.use(static(
  path.join( __dirname,  staticPath)
));

app.use(Bodyparser());
app.use(Logger());
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 20*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(route.routes());
app.listen(SERVER_PORT);
console.log("server start at http://localhost:"+SERVER_PORT);