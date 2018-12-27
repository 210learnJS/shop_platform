/*
 * @Author: GuoWei
 * @Date: 2018-12-25 22:20:04
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-27 14:40:33
 * @Description: 
 */
const mysql = require('mysql');
const fs = require('fs');


async function init() {

}
const sqlConfig = JSON.parse(fs.readFileSync("./server/database/mysql_config.json"));
// const sqlConfig = JSON.parse(fs.readFileSync("./mysql_config.json"));

var connection = mysql.createConnection(sqlConfig.comment);

connection.connect();
// var sql = `SELECT * FROM comment where comment_id=1`;
// connection.query(sql, function (err, result) {
//     if (err) {
//        throw new Error("查询数据库出错");
//     }
//     console.log(result);
// });

// param={
//     name:"comment",
//     tr:"",
//     td:"",
//     data:{
//         comment_id:"",
//         goods_id:"",
//         goods_name:"",
//         user_id:"",
//         user_name:"",
//         parent_comment_id:"",
//         comment_detail:"",
//         comment_date:"",

//     }
// };
async function searchMySQL(table) {
    var sql = `SELECT * FROM comment where ${table.tr}=${table.td}`
    let result = undefined;
    result = await new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(new Error("INSERT ERROR"));

            }
            resolve(result);
        })
    });
    return result;
}
async function insertMySQL(table) {

    /********** *处理传入的数据***********/
    let dataList = Object.getOwnPropertyNames(table.data);     //存储属性名
    let keyStr = [],          //存储属性值？的个数
        valueStr = [];        //存储属性值
    for (let i = 0; i < dataList.length; i++) {
        keyStr.push("?");
        valueStr.push(table.data[dataList[i]]);
    }

    var addSql = `INSERT INTO ${table.name}(${dataList.toString()}) VALUES(${keyStr.toString()})`;
    var addSqlParams = valueStr;
// console.log(addSql);
// console.log(addSqlParams);
    let result = await new Promise((resolve, reject) => {
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                reject(new Error("INSERT ERROR"));

            }
            resolve(result);
        })
    });

    return result;
}
async function delMySQL(table) {
    let delSql = `DELETE FROM ${table.name} where ${table.tr}=${table.td}`;
    let result = undefined;
    result = new Promise((resolve, reject) => {
        connection.query(delSql, function (err, result) {
            if (err) {
                reject(new Error("DELETE ERROR"));
            }
            resolve(result);
        })
    });

    return result;
}



// async function getcomment() {
//     const result = await insertMySQL({
//         name: "comment",
//         tr: "comment_id",
//         td: "1",
//         data: {
//             comment_id: "23",
//             goods_id: "",
//             goods_name: "",
//             user_id: "",
//             user_name: "",
//             parent_comment_id: "",
//             comment_detail: "",
//             comment_date: "2018-01-01 13:12:12",
//         }
//     });
//     console.log(result);
//     return result;
// }


// getcomment();
// connection.end();
module.exports = {
    searchMySQL, insertMySQL, delMySQL
}

