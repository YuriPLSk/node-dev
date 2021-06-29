var config = require("./connection");
var mysql = require("mysql");

var developer_app  = {
    HandleSelect :function(request,response){
        var sql_str = `select * from sys_developer`;
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
                    message: "查询成功",
                });
            }
        });
    }
}

module.exports =  developer_app;