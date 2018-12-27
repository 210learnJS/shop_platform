/*
 * @Author: GuoWei
 * @Date: 2018-12-25 22:20:04
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-27 11:14:24
 * @Description: 
 */
const mysql = require('mysql');
const fs = require('fs');


async function init(){
    
}
const sqlConfig = JSON.parse(fs.readFileSync("./server/database/mysql_config.json"));

var connection = mysql.createConnection(sqlConfig.comment);

connection.connect();



async function searchCommentMySQL(tableName) {
    var sql = `SELECT * FROM ${tableName}`;
    let result = undefined;
    result = await new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(new Error("查询数据库出错"));
            }
            resolve(result);
        });
    });

    return result;
}
async function insertCommentMySQL(tableName, comment) {
    var addSql = `INSERT INTO ${tableName}(user_id,user_name,goods_detail,comment_detail,img) VALUES(?,?,?,?,?)`;
    var addSqlParams = [comment.user_id, comment.user_name, comment.goods_detail, comment.comment_detail, comment.img];
    
    let result=await new Promise((resolve,reject)=>{
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                reject( new Error("INSERT ERROR"));
                
            }
            resolve(result);
        })
    });
 
    return result;
}
async function delCommentMySQL(tableName, user_id) {
    let delSql = `DELETE FROM ${tableName} where user_id=${user_id}`;
    let result=undefined;
    result=new Promise((resolve,reject)=>{
        connection.query(delSql, function (err, result) {
            if (err) {
               reject(new Error("DELETE ERROR"));
            }
            resolve(result);
        })
    });
 
    return result;
}


// connection.end();
module.exports = {
    searchCommentMySQL, insertCommentMySQL, delCommentMySQL
}

