/*
 * @Author: GuoWei
 * @Date: 2018-12-25 22:20:04
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-28 09:34:50
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

tableList = {
    "comment": ["comment_id", "goods_id", "goods_name", "user_id", "user_name", "parent_comment_id", "comment_detail", "comment_date"]
}

let formSQL = {
    Insert: function (table, data) {
        let addSqlParams = [];
        for (let i in data) {
            addSqlParams.push(data[i]);
        }
        let out = {
            addsql: `INSERT INTO ${table}(${tableList[table].toString()}) VALUES(?,?,?,?,?,?,?,?)`,
            addSqlParams
        }
        return out;
    },
    del: function () {
        let delsql = "";
        if (data) {
            for (let i in data) {
                delsql = `DELETE * FROM ${table} where ${i}=${data[i]}`;
            }
        }
        return { delSql };
    },
    search: function (table, data) {
        let sql = "";
        if (data) {
            for (let i in data) {
                sql = `SELECT * FROM ${table} where ${i}=${data[i]}`;
            }
        }
        // console.log(sql);
        return { sql };
    }
}

async function insert(table, data) {
    var { addSql, addSqlParams } = formSQL.Insert(arguments);
    console.log(addSql);
    console.log(addSqlParams);
    let result = await new Promise((resolve, reject) => {
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                reject(new Error("INSERT ERROR"));
                return;
            }
            resolve(result);
        })
    });
    connection.end();
    return result;
}
async function del(table, data) {
    let { delSql } = formSQL.del(table, data);
    let result = undefined;
    result = new Promise((resolve, reject) => {
        connection.query(delSql, function (err, result) {
            if (err) {
                reject(new Error("DELETE ERROR"));
            }
            resolve(result);
        })
    });
    connection.end();
    return result;
}
async function search(table, data) {
    var { sql } = formSQL.search(table, data);
    let result = undefined;
    result = await new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(new Error("INSERT ERROR"));

            }
            resolve(result);
        })
    });
    connection.end();
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
    search, insert, del
}

