const Router = require("koa-router");

const action = require("./controllers/actionTest.js");

const {  link,
    login,
    getComment,
    addComment,
    delComment,
    uploadImg} = action;
// const action = require("./controllers/action.js");



//路由
const route = Router();

//add
route.get('/', link);

//search
route.get('/login', login);
route.post('/login', login);

route.get('/getComment',getComment);
route.get('/addComment',addComment);
route.get('/delComment',delComment);
//uploadImg
route.post('/uploadImg', uploadImg);

module.exports = route;