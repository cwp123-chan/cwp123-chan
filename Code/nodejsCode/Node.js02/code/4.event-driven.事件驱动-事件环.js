
var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
// var hostname = '192.168.14.254';
var port = 3000;

console.log(1);

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    // 获取用户的IP
    var userIp = getIp(req);
    // 随机数 1-9
    var num = Math.ceil(Math.random() * 10000 % 9);
    // console.log('欢迎IP: ' + userIp + ' 的用户读取第:[ ' + num + ' ]张图片');

    // 读取图片输出
    fs.readFile('./imgs/'+num+'.jpg', function (err, data){
        if (err) throw err;

        res.writeHead(200, {'content-type': 'image/jpeg'});
        // console.log(userIp + ' 的第[ ' + num + ' ]张图片,已读取完成!');

        res.end(data);
        console.log(2);
    });

    console.log(3);
});

// 运行服务器
server.listen(port, hostname);

console.log(4);


// 获取url请求客户端ip
var getIp = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};