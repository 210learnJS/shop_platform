const Router = require("koa-router");

const action = require("./controllers/actionTest.js");

const { index, add, del, update, search, login, getMysql,addMysql,delMysql } = action;

//路由
const route = Router();

//首页
route.get('/', index);

//add
route.get('/add', add);

//del
route.get('/del', del);

//update
route.get('/update', update);

//search
route.get('/search', search);

//search
route.get('/login', login);
route.post('/login', login);

route.get('/getMysql',getMysql);
route.get('/addMysql',addMysql);
route.get('/delMysql',delMysql);

module.exports = route;