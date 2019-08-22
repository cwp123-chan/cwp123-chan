
var http = require('http');
// console.log(http);
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // console.log(req);
    // console.log(res);
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

/*    res.writeHead(200, {'Content-type':'text/html;charset=UTF-8'});
    res.write('<h1>我是 H1 标题</h1>');
    res.end(getIp(req) + '的用户,请求了: ' + req.url);*/
    
   /* fs.readFile('./imgs/1.jpg', function (err, data){
        // res.writeHead(200, {'Content-type':'text/html;charset=UTF-8'});
        res.writeHead(200, {'Content-type':'image/jpg'});
        res.end(data);
    });*/

    res.statusCode = 404;
    res.setHeader('Content-type','text/html;charset=UTF-8');
    res.end('404 弄他 found');

});
// console.log(server);

// 运行服务器
server.listen(port, hostname);


// 获取客户端的IP
var getIp = function (req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip;
}