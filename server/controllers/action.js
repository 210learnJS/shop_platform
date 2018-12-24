'use strict';
const fs = require('fs');
//import { successRes, errorRes } from '../util/res.js'
const Res = require('../util/res.js');
const { successRes, errorRes } = Res;
const { USER_TABLE } = require('../constants/constant.js');

const Database = require('../model/contactDB.js');
const DB = new Database('./server/model/data.json');
DB.startDatabase(function(){
    DB.addTable(USER_TABLE, {
        "username": "",
        "password": ""
    });
});

function getRequst(ctx){
  ctx.set('Access-Control-Allow-Origin', '*');
  let param = {};
  if(ctx.method === 'GET'){
    param = ctx.request.query;
  }else{
    param = ctx.request.body;
  }
  var isJsonp = false;
  if(typeof param.callback !== "undefined"){
    isJsonp = true;
  }
  var callback =  param.callback;
  if(isJsonp){
    let tempObj = {};
    for(let o in param){
      if(o != "callback"){
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

//添加
async function add(ctx, next){ 
  	try{
      	const { param, isJsonp, callback } = getRequst(ctx);
		var person = {
			username: param.username,
			password: param.password
		}
		const result = await DB.add(USER_TABLE, person);
		const response = result?successRes('添加数据成功'):errorRes('添加数据失败');
		console.log("add result: ",response);
		if(isJsonp){
			response = callback+"("+JSON.stringify(response)+")";
		}
		return ctx.body = response;
  }catch(err){
		console.error(err);
    	return ctx.body = errorRes('', `${err}`);
  } 
}
//删除
async function del(ctx, next){
	try{
		const { param, isJsonp, callback } = getRequst(ctx);
		const result = await DB.del(USER_TABLE, param);
		const response = result?successRes('删除数据成功'):errorRes('删除失败，未检索到数据');
		console.log("delete result: ", response);
		if(isJsonp){
			response = callback+"("+JSON.stringify(response)+")";
		}
		return ctx.body = response;
	}catch(err){
		console.error(err);
		return ctx.body = errorRes('', `${err}`);
	} 
}
//修改
async function update(ctx, next){
  try{
    const { param, isJsonp, callback } = getRequst(ctx);
    const condition = {username: param.username};
	const change = {password: param.password};
	console.log(111);
    const result = await DB.update(USER_TABLE, condition, change);
    const response = result?successRes('修改数据成功'):errorRes('修改数据失败');
	console.log("update result: ", response);
	if(isJsonp){
		response = callback+"("+JSON.stringify(response)+")";
	}
    return ctx.body = response;
  }catch(err){
	  	console.error(err);
   		return ctx.body = errorRes('', `${err}`)
  }
}

//搜索
async function search(ctx, next){
  try{
    const { param, isJsonp, callback } = getRequst(ctx);
    const result = await DB.search(USER_TABLE, param);
    var response = result.length>0?successRes(result):errorRes('搜索数据失败');
    console.log("search result: ", result);
    if(isJsonp){
      response = callback+"("+JSON.stringify(response)+")";
    }
    ctx.body = response;
    return result;
  }catch(err){
    console.log(err);
    return ctx.body = errorRes('', `${err}`)
  }
}

module.exports = {
  add: add,
  del: del,
  update: update,
  search: search
};
