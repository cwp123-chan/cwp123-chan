
var http = require('http');
var fs = require('fs'); // 文件系统

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // http://127.0.0.1:3000/cs    1.html页面
    // http://127.0.0.1:3000/ls    2.html页面

    // console.log(req.url);
    if (req.url == '/cs') {
        fs.readFile('./1.html', function (err, data){
            res.writeHead(200, {'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        });
    } else if (req.url == '/ls') {
        fs.readFile('./2.html', function (err, data){
            res.writeHead(200, {'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        });
    } else if (req.url == '/imgs/cut.gif') {
        fs.readFile('./imgs/cut.gif', function (err, data){
            res.writeHead(200, {'Content-type':'image/gif'});
            res.end(data);
        });
    } else {
        res.writeHead(404, {'Content-type':'text/html;charset=UTF-8'});
        res.end('<h1>404 Not Found</h1>');
    }
});

// 运行服务器
server.listen(port, hostname);
