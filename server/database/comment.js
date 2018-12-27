/*
 * @Author: GuoWei
 * @Date: 2018-12-24 11:24:43
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-26 21:04:46
 * @Description: 
 */


var mysql=require("./mysql.js");


async function getcommentList(goods_id){
  let result = await mysql.searchCommentMySQL(goods_id);
  console.log(result);
  return result;
}
async function addComment(goods_id,Comment){
  let result = await mysql.insertCommentMySQL(goods_id,Comment);
  console.log(result);
  return result; 
}
async function delComment(goods_id,userId){
  let result = await mysql.delCommentMySQL(goods_id,userId);
  console.log(result);
  return result; 
}


getcommentList("new_table");
delComment("new_table",1);
getcommentList("new_table");



