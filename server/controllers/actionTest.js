'use strict';
const fs = require('fs');
const mysql = require("../database/mysql.js");
const Res = require('../util/res.js');
const { successRes, errorRes } = Res;
const { USER_TABLE } = require('../constants/constant.js');
const { goodsTable, commentTable } = JSON.parse(fs.readFileSync("./server/database/mysql_config.json")).tableList;

function getRequst(ctx) {
  ctx.set('Access-Control-Allow-Origin', '*');
  let param = {};
  if (ctx.method === 'GET') {
    param = ctx.request.query;
  } else {
    param = ctx.request.body;
  }
  var isJsonp = false;
  if (typeof param.callback !== "undefined") {
    isJsonp = true;
  }
  var callback = param.callback;
  if (isJsonp) {
    let tempObj = {};
    for (let o in param) {
      if (o != "callback") {
        tempObj[o] = param[o];
      }
    }
    param = tempObj;
  }
  const outputObj = {
    param: param,
    callback: callback,
    isJsonp: isJsonp
  };
  return outputObj;
}
//将字符串转换为数组
function transAry(obj,attributeList){
  for(let i=0;i<attributeList.length;i++){ 
    // console.log(obj[0]);
    //  console.log(obj[0][attributeList[i]]);
     obj[0][attributeList[i]]=obj[0][attributeList[i]].split(",");
    //  console.log(typeof obj[0][attributeList[i]]);
  }
  return obj;
  }
//登录
async function usernameExist(ctx, next) {
  try {
    const { param } = getRequst(ctx);
    var obj = {
      username: param.username
    }
    const result = await mysql.search(USER_TABLE, obj);
    const response = result ? successRes(result) : errorRes('搜索数据失败');
    return response;
  } catch (err) {
    return err;
  }
}
async function login(ctx, next) {
  try {
    const { param } = getRequst(ctx);
    let response = usernameExist.apply(this, arguments);
    if (response.status.code == 1) {
      if (response.result.password == param.password) {
        ctx.body = successRes(true);
      }
      else {
        ctx.body = errorRes("密码错误");
      }
    }
    else {
      ctx.body = response;
    }
}catch(err){
  return console.log(err);
}
}
//商品详情页
async function getGoodsInfo(ctx, next) {
  try {
  
    const { param } = getRequst(ctx);
    const table = goodsTable;
    let result = await mysql.search(table, param);
    result=transAry(result,["goodsColor","goodsSize","goodsImgUrl"]);
    console.log(result);
    const response = result ? successRes(result) : errorRes('搜索数据失败');
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }
}

//评论部份数据库
async function getComment(ctx, next) {
  try {
    const { param } = getRequst(ctx);
    // console.log(param);
    const table = commentTable;
    // console.log(table);
    const result = await mysql.search(table, param);
    const response = result ? successRes(result) : errorRes('搜索数据失败');
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }
}
async function addComment(ctx, next) {
  try {
    const { param } = getRequst(ctx);
    console.log(param);
    const table = commentTable;
    const result = await mysql.insert(table, param);
    const response = result ? successRes(result) : errorRes('添加数据失败');
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }

}
async function delComment(ctx, next) {
  try {
    const { param } = getRequst(ctx);
    const table = commentTable;
    const result = await mysql.del(table, param);
    const response = result ? successRes(result) : errorRes("删除失败");
    ctx.body = response;
    return result;
  }
  catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }
}

//其他
async function uploadImg(ctx, next) {
  try {
    console.log(ctx.request.files);
    const file = ctx.request.files.imgfile; // 获取上传文件
    const reader = fs.createReadStream(file.path);// 创建可读流
    const suffixName = file.name.split(".").pop();
    const filename = `img-${Date.now()}.${suffixName}`;
    const filePath = path.join(__dirname, '../../client/static/images') + `/${filename}`;
    const upStream = fs.createWriteStream(filePath);// 创建可写流
    reader.pipe(upStream);// 可读流通过管道写入可写流
    return ctx.body = successRes({ filename: `${PATH}/static/images/${filename}` });
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('上传图片出错', `${err}`)
  }
}
async function link(ctx, next) {
  try {
    ctx.response.type = 'html';
    ctx.body = fs.createReadStream('./client/pages/test/link.html');
  } catch (err) {
    console.error(err);
    return ctx.body = errorRes('', `${err}`);
  }
}

module.exports = {
  link,
  login,
  getComment,
  addComment,
  delComment,
  uploadImg,
  getGoodsInfo
};
