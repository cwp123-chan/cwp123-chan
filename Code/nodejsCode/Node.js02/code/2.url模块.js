
var http = require('http');
var url = require('url'); // 引入url模块. 处理解析URL

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    res.writeHead(404, {'content-type': 'text/html;charset=utf-8'});
    console.log(req.url); //  获取url信息
    // console.log(url);
    /*var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    var search = url.parse(req.url).search;

    console.log(pathname);
    console.log(query);
    console.log(search);*/

    // var queryObj = url.parse(req.url, true).query;
    // console.log(queryObj);
    // res.end('响应完成');

    
    // GET 参数的处理
    var getParams = url.parse(req.url, true).query;
    var name = getParams.name;
    var age = getParams.age;
    var sex = getParams.sex;
    res.end('服务器接收到了以下信息: '+ name + ' | ' + age + ' | ' + sex);
});

// 运行服务器
server.listen(port, hostname);
