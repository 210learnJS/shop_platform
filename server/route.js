const Router = require("koa-router");

const action = require("./controllers/actionTest.js");

const { link, login, getComment, addComment, delComment, uploadImg, getGoodsInfo } = action;
// const action = require("./controllers/action.js");



//路由
const route = Router();

//add
route.get('/', link);

//search
route.get('/login', login);
route.post('/login', login);

route.get('/getComment', getComment);
route.get('/addComment', addComment);
route.get('/delComment', delComment);

route.get('/goodsInfo', getGoodsInfo);
//uploadImg
route.post('/uploadImg', uploadImg);
//search
// route.post('/goods',goods)

module.exports = route;