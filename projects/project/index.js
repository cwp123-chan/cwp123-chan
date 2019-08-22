var express = require('./node_modules/express');
var app = express();
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('./myapp/node_modules/formidable'); // 处理表单数据
var timestamp = require('./myapp/node_modules/timestamp'); // 时间
var path = require('path'); // 时间
var ejs = require('ejs');
var Test = require('./view/js/Test.js');
var mysql = require('./node_modules/mysql');
var path = require('path');
// var session = require('express-session');
// var router = express.Router();

// var bodyParser = require('./node_modules/bodyParser');
var hostname = '192.168.28.71';
var port = 3000;
// router.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 60000}}));


var server = http.createServer(function (req, res) {

    // var sql =
    if (req.url == '/') {

// /home/mrchan/文档/文档/project/myapp/node_modules页面
        fs.readFile('./view/login.html', function (err, data) {
            res.writeHead(200, {'content-type': 'text/html;charset=UTF-8;'});
            res.end(data);
        });
    } else if (req.url == '/dopost' && req.method.toLocaleLowerCase() == 'post') {

        console.log('路径：'+ req.url);

        // 如果访问/dopost,且请求类型是post
        var form = new formidable.IncomingForm();
        // 设置上传目录
        form.uploadDir = "./public";



        // 该模块已经将 POST数据 和 文件数据 分离处理
        // formidable 处理 parse a file upload
        // 当代码执行到parse()方法的回调函数时,表单中的数据 就都已经处理好了
        form.parse(req, function (err, fields, files) {


            console.log(fields);
            //
            console.log(files);

            var t = timestamp('YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 100000);
            var connection = mysql.createConnection({

                host: '127.0.0.1',       //主机
                user: 'root',            //MySQL认证用户名
                password: 'cwp199811',
                port: '3306',
                database: 'info'


            });
            //建立数据库连接
            connection.connect(function (err) {

                if (err) {

                    console.log('[query] - :' + err);

                    return;

                }
            });
            var massage = `'${fields.massage}' `;
            var pwd = `'${fields.pwd}'`;
            var msql = "select * from user where name= " + massage + "and pwd=" + pwd;
            connection.query(msql, function (err, result) {
                // console.log(result);
                var str = '';
                 str = JSON.stringify(result);
                 var names = result[0].name;
                 // console.log("那么"+names);
                 // console.log('缓存：'+ req.session);

                // console.log(result.length);
                if (result.length !== 0) {

                    fs.readFile('./view/isok.ejs', function (err, data) {
                        var src1 = JSON.parse(str)[0].srcs;
                        console.log(src1);
                        var t1 = {
                            ti: '恭喜登陆成功！',
                            src:src1,
                            names:names
                        }

                  
                        // console.log(JSON.parse(str)[0].srcs);

                        var newdata = data.toString();
                        var dats = ejs.render(newdata, t1);

                        res.writeHead(200, {'content-type': 'text/html'});
                        console.log(req.url);



                        res.end(dats);
                    });




                } else if (result.length == 0) {

                    fs.readFile('./view/isok.ejs', function (err, data) {
                        var t1 = {
                            ti: '用户不存在，请注册！'

                        };
                        var newdata = data.toString();
                        var dats = ejs.render(newdata, t1);
                        res.writeHead(200, {'content-type': 'text/html'});

                        res.end(dats);
                    });

                }else{
                    res.end('页面不存在');
                }
                connection.end();
            });


            // Test(fields);

        });
    } else if (req.url == '/view/page/logout.html') {
        console.log('da');
        // 读取注册加载页面
        fs.readFile('./view/logout.html', function (err, data) {
            res.writeHead(200, {'content-type': 'text/html;charset=UTF-8;'});
            res.end(data);
        });

        // 此代码往下用于注册

    } else if (req.url == '/page/dolog.html' && req.method.toLocaleLowerCase() == 'post') {
        // 如果访问/dopost,且请求类型是post
        var form = new formidable.IncomingForm();
        // 设置上传目录
        form.uploadDir = "./public";

        // 该模块已经将 POST数据 和 文件数据 分离处理
        // formidable 处理 parse a file upload
        // 当代码执行到parse()方法的回调函数时,表单中的数据 就都已经处理好了
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            //
            // console.log(files);
            // 处理上传文件的存储
            // 新文件名: 时间 + 随机数 + 后缀
            var t2 = timestamp('YYYYMMDDHHmmss');
            var ran2 = parseInt(Math.random() * 100000);
            var extname2 = path.extname(files.myfile.name);

            // 旧文件名
            var oldPath2 = './' + files.myfile.path;
            // 新文件名
            var newPath2 =  './public/' + t2 + ran2 + extname2;
            // console.log(oldPath);
            // console.log(newPath);

            // 实现改名 # 并且判断用户是否存在
            fs.rename(oldPath2, newPath2, function (err) {
                console.log(fields);

                console.log(files);

                // 连接数据库
                var connection = mysql.createConnection({

                    host: '127.0.0.1',       //主机
                    user: 'root',            //MySQL认证用户名
                    password: 'cwp199811',
                    port: '3306',
                    database: 'info'


                });
                // 建立连接

                connection.connect(function (err) {

                    if (err) {

                        console.log('[query] - :' + err);

                        return;

                    }
                    var fnam = ` '${fields.name2}'  `;

                    var fpwd = ` '${fields.pwd2}'   `;
                    var newpath = `'${newPath2} '`;
                    //创建sql语句
                    var sql = 'insert into user (name,pwd,srcs)values(' + fnam + ',' + fpwd + ',' +newpath +')';
                    //执行sql语句

                    console.log(sql);
                    connection.query(sql, function (err, result) {
                        console.log(result);
                        res.writeHead(200, {'content-type': 'text/html;charset=UTF-8;'});
                        res.end(' <script> (function(){alert("注册成功");history.go(-2)})()</script> ');
                    });
                    connection.end();
// <input type="button" value="返回" onClick="javascript: history.go(-2)">

                });
            });
        });
    } else{
        console.log('dizhi:'+req.url);
        fs.readFile('.'+req.url, function (err, data) {
            // res.writeHead(200, {'content-type': 'text/html;charset=UTF-8;'});
            res.end(data);
        });
    }


});
function haha(req,res,next){
    res.render('./public/');
    next();
}

server.listen(port, hostname);












