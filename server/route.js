const Router = require("koa-router");

const action = require("./controllers/action.js");

const { add, del, update, search } = action;

//路由

const route = Router();

//add
route.get('/add', add);
route.post('/add', add);

//del
route.get('/del', del);

//update
route.get('/update', update);

//search
route.get('/search', search);


module.exports = route;