'use strict';
const fs = require('fs');
const mysql = require("../database/mysql.js");
//import { successRes, errorRes } from '../util/res.js'
const Res = require('../util/res.js');
const { successRes, errorRes } = Res;
const { USER_TABLE } = require('../constants/constant.js');

const Database = require('../model/contactDB.js');
const DB = new Database('./server/model/data.json');
DB.startDatabase(function () {
  DB.addTable(USER_TABLE, {
    "username": "",
    "password": ""
  });
});

//首页
async function index(ctx, next) {
  try {
    const data = await fs.readFileSync('./client/pages/index/index.html');
    ctx.response.type = 'text/html';
    return ctx.body = data;
  } catch (err) {
    return ctx.body = errorRes('', `${err}`)
  }
}
//添加
async function add(ctx, next) {
  try {
    let param = ctx.request.query;
    var person = {
      username: param.username,
      password: param.password
    }
    const result = await DB.add(USER_TABLE, person);
    const response = result ? successRes('添加数据成功') : errorRes('添加数据失败');
    console.log("add result: ", response);
    return ctx.body = response;
  } catch (err) {
    return ctx.body = errorRes('', `${err}`);
  }
}
//删除
async function del(ctx, next) {
  try {
    const param = ctx.request.query;
    const result = await DB.del(USER_TABLE, param);
    const response = result ? successRes('删除数据成功') : errorRes('删除失败，未检索到数据');
    console.log("delete result: ", response);
    return ctx.body = response;
  } catch (err) {
    return ctx.body = errorRes('', `${err}`);
  }
}
//修改
async function update(ctx, next) {
  try {
    const query = ctx.request.query;
    const param = { username: query.username };
    const change = { password: query.password };
    const result = await DB.update(USER_TABLE, param, change);
    const response = result ? successRes('修改数据成功') : errorRes('修改数据失败');
    console.log("update result: ", response);
    return ctx.body = response;
  } catch (err) {
    return ctx.body = errorRes('', `${err}`)
  }
}
//搜索
async function search(ctx, next) {
  try {
    let param = ctx.request.query;
    const result = await DB.search(USER_TABLE, param);
    const response = result.length > 0 ? successRes(result) : errorRes('搜索数据失败');
    console.log("search result: ", result);
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`)
  }
}
//登录
async function login(ctx, next) {
  try {
    let param = ctx.request.query;
    var obj = {
      username: param.username,
      password: param.password
    }
    const result = await DB.search(USER_TABLE, obj);
    const response = result.length > 0 ? successRes(result) : errorRes('搜索数据失败');
    console.log("search result: ", result);
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`)
  }
}

//评论部份数据库
async function getMysql(ctx, next) {
  try {
    let param=ctx.request.query;
    const result = await mysql.search({
              name: "comment",
              tr: "comment_id",
              td: "1",        
          });
    const response = result.length > 0 ? successRes(result) : errorRes('搜索数据失败');
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }

}
async function addMysql(ctx, next) {
  try {
    let param=ctx.request.query;
    const result = await mysql.insert(param);
    const response = result ? successRes(result) : errorRes('添加数据失败');
    ctx.body = response;
    return result;
  } catch (err) {
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }
  
}
async function delMysql(ctx, next) {
  try{
    let param=ctx.request.query;
    const result=await mysql.del(param);
    const response=result?successRes(result):errorRes("删除失败");
    ctx.body=response;
    return result;
  }
  catch(err){
    console.log(err);
    return ctx.body = errorRes('', `${err}`);
  }
}

module.exports = {
  index: index,
  add: add,
  del: del,
  update: update,
  search: search,
  login: login,
  getMysql: getMysql,
  addMysql: addMysql,
  delMysql: delMysql
};