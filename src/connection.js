var mysql = require('mysql')

const ADDRESS = '127.0.0.1';
const PORT = '3306';
const USERNAME = 'root';
const PASSWORD = 'root';
const DATABASE_NAME = 'vue';
var config = {
    host:ADDRESS,
    user:USERNAME,
    password:PASSWORD,
    database:DATABASE_NAME,
    PORT:PORT,
}

// mysql服务路径 net start mysql / net stop mysql
// D:\Navicat\mysql-5.7.7-rc-winx64\bin

//建立链接


// export default connection;
module.exports = config;