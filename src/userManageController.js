// var express = require("express");
var config = require("./connection");
var mysql = require("mysql");

// var sub_app = express(); // 子程序
// sub_app.use(express.json());

var sub_app = {
    HandleInsert: function (request, response) {
        console.log(request.body);
        var paramArr = new Array();
        for (var i in request.body) { 
            paramArr.push(request.body[i]);
        }
        var paramStr = JSON.stringify(paramArr);
        var sql_str = `insert into sys_user_info values(null,${paramStr.slice(1,paramStr.length -1 )})`;
        // 新建数据库实例
        var SQL = mysql.createConnection(config);
        // 数据库链接
        SQL.connect();
        //   查询
        SQL.query(sql_str, function (error, results, fields) {
            if (error) throw error;
            // 打印服务端日志
            console.log(
                "--------------------------参数----------------------------\n"
            );
            console.log(sql_str);
            console.log(
                "--------------------------查询结果----------------------------\n"
            );
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            console.log(
                "---------------------------结束-------------------------------\n"
            );
            // 关闭连接
            SQL.end();
            // 返回值处理，处理后return前端
            if (results.length != 0) {
                console.log(results);
                return response.json({
                    status: 200,
                    message: "新增数据成功",
                });
            }
        });
    },
    HandleSelect: function (request, response) {
        var sql_str = `select * from sys_user_info`;
        // 新建数据库实例
        var SQL = mysql.createConnection(config);
        // 数据库链接
        SQL.connect();
        //   查询
        SQL.query(sql_str, function (error, results, fields) {
            if (error) throw error;
            // 打印服务端日志
            console.log(
                "--------------------------参数----------------------------\n"
            );
            console.log(sql_str);
            console.log(
                "--------------------------查询结果----------------------------\n"
            );
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            console.log(
                "---------------------------结束-------------------------------\n"
            );
            // 关闭连接
            SQL.end();
            // 返回值处理，处理后return前端
            if (results.length != 0) {
                console.log(results);
                return response.json({
                    data:results,
                    status: 200,
                    message: "查询人员列表成功",
                });
            }
        });
    },
    HandleUpdate:function(request,response){
        var paramArr = new Array();
        for (var i in request.body) { 
            paramArr.push(request.body[i]);
        }
        console.log(paramArr)
        var SQL = mysql.createConnection(config);
        var sql_str = `update sys_user_info set age = ${paramArr[5]},email = "${paramArr[6]}",sex = "${paramArr[4]}", jobno= ${paramArr[3]} where username = "${paramArr[2]}"`
        SQL.connect();
        SQL.query(sql_str,function(error,results,fields){
            if (error) throw error;
            // 打印服务端日志
            console.log(
                "--------------------------参数----------------------------\n"
            );
            console.log(sql_str);
            console.log(
                "--------------------------查询结果----------------------------\n"
            );
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            console.log(
                "---------------------------结束-------------------------------\n"
            );
            // 关闭连接
            SQL.end();
            // 返回值处理，处理后return前端
            if (results.length != 0) {
                console.log(results);
                return response.json({
                    status: 200,
                    message: "数据更新成功",
                });
            }
        })
    },
    HandleDelete:function(request,response){
        var sql_str = `delete from sys_user_info where username = "${request.body.username}"`;
        // 新建数据库实例
        var SQL = mysql.createConnection(config);
        // 数据库链接
        SQL.connect();
        //   查询
        SQL.query(sql_str, function (error, results, fields) {
            if (error) throw error;
            // 打印服务端日志
            console.log(
                "--------------------------参数----------------------------\n"
            );
            console.log(sql_str);
            console.log(
                "--------------------------查询结果----------------------------\n"
            );
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            console.log(
                "---------------------------结束-------------------------------\n"
            );
            // 关闭连接
            SQL.end();
            // 返回值处理，处理后return前端
            // if (results.length != 0) {
            //     console.log(results);
            // }
            return response.json({
                status: 200,
                message: "删除成功",
            });
        });
    }
};
module.exports = sub_app;
