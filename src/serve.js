var express = require("express");
var Mock = require("mockjs");
var mysql = require('mysql')

var app = express(); // 主程序


// 引入其他js
var config = require("./connection");
var USERMANAGE = require("./userManageController");
var DEVELOPERMANAGE = require("./developerInfoManage");
// console.log(USERMANAGE)
//两种解析post传参的方式
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())


//增加头部信息解决跨域问题
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3999"); //允许源访问，本利前端访问路径为“http://localhost:3999”通配“*”
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", " 3.2.1");
  next();
});

// 处理根目录的get请求
app.get("/getVideoList", function (req, res) {
  console.log(req, res);
  return res.json(
    Mock.mock({
      status: 200,
      data: [
        {
          id: 1,
          creatorName: Mock.mock("@name()"),
          albumnName: Mock.mock("@last()"),
          companyName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 2,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 3,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 4,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 5,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 6,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 8,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 9,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 10,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 11,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 12,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
        {
          id: 13,
          creatorName: Mock.mock("@name()"),
          companyName: Mock.mock("@last()"),
          albumnName: Mock.mock("@last()") + " Company",
          "onLineSales|1000-10000": 5000,
          "offLineSales|1000-10000": 5000,
          releaseDate: Mock.mock('@date("yyyy-MM-dd")'),
          phoneNumber: Mock.mock("@email"),
        },
      ],
    })
  );
});

app.post("/checkLogin", (req, res) => {

  var flag = false;
  var arg = {
    username:req.body.username,
    password:req.body.password,
  }
  var sql_str = `SELECT username,password from sys_users where username = '${arg.username}' and password = '${arg.password}'`;
//   新建数据库实例
  var SQL = mysql.createConnection(config);
//   数据库链接
  SQL.connect();
//   查询
  SQL.query( sql_str, function (error, results, fields) {
    if (error) throw error;
    // 打印服务端日志
    console.log("--------------------------参数----------------------------\n");
    console.log(arg)
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
      for (var item of results) {
        if (item.username == req.body.username && item.password == req.body.password) {
          flag = item.username;
        } else {
            console.log('errInfo',arg,item)
        }
      }
      console.log("flag:",flag)
      return flag.constructor == String
        ? res.json({
            status: 200,
            message: "登录成功,欢迎你" + flag,
          })
        : res.json({
            status: 999,
            message: "登录失败，请检查用户名及密码",
          });
    } else {
        return res.json({
            status: 999,
            message: "登录失败，请检查用户名及密码",
          });
    }
  });
});

app.post("/insertData", (req, res) => { 
    USERMANAGE.HandleInsert(req,res);
});
app.get("/getAllUsers",(req,res) => {
    USERMANAGE.HandleSelect(req,res);
})
app.post("/updateUsers",(req,res) => {
    USERMANAGE.HandleUpdate(req,res);
})
app.post("/deleteUser",(req,res) => {
    USERMANAGE.HandleDelete(req,res)
})
app.get("/getDeveloperInfo",(req,res) => {
    DEVELOPERMANAGE.HandleSelect(req,res)
})

// 监听3000端口
var server = app.listen(3000);


console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:3000/");
