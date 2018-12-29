const Router = require("koa-router");
const action = require("./controllers/action.js");

const { link, add, del, update, search, login, uploadImg } = action;

//路由
const route = Router();

//add
route.get('/', link);

//add
route.get('/add', add);
route.post('/add', add);

//del
route.get('/del', del);
route.post('/del', del);

//update
route.get('/update', update);
route.post('/update', update);

//search
route.get('/search', search);
route.post('/search', search);
//search
route.get('/login', login);
route.post('/login', login);

//uploadImg
route.post('/uploadImg', uploadImg);

module.exports = route;