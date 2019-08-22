
var express = require('express');
var mysql = require('mysql');
var app = express();

app.get('/', function(req,res){
    // 连接数据库
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '123456',
        database : 's86'
    });
    // 开启数据库
    connection.connect();

    // var sql = 'SELECT * FROM user';
    var sql = 'UPDATE user SET age="19" WHERE id="1"';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('执行出错: ' + err);
            return;
        }

        console.log(result);
        res.send(result);
    });

    connection.end();
});


app.listen(3000);



