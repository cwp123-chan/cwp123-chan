// 搭建nodejs WEB服务器

// 引入HTTP模版
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
// req 表示请求(request) / res 表示响应(response)
var server = http.createServer(function(req, res){
    // 设置HTTP头信息. 状态码 200; 文件类型是html; 字符集 utf-8
    res.writeHead(200, {'Content-type':'text/html;charset=UTF-8'});
    // 服务器响应输出完成
    res.end('Hi~ o(*￣▽￣*)ブ, 首个nodejs页面,您的积分为: ' + (50 + 10) + '分'); 
});

// 运行服务器
server.listen(port, hostname, function(){
    console.log(`请访问: http://${hostname}:${port}`);
});
