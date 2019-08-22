
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    res.writeHead(404, {'content-type': 'text/html;charset=utf-8'});

    // console.log(req.headers); // 头信息对象
    // console.log(req.rawHeaders); // 头列表
    // console.log(req.method); // 获取请求方式
    // console.log(res.statusCode); // 获取响应状态码
    // console.log(res.statusMessage); // 获取响应状态信息

    res.end('响应完成');

});

// 运行服务器
server.listen(port, hostname);

