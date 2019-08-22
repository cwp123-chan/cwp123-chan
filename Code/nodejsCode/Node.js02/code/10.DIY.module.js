

var http = require('http');
var router = require('./router.js');

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    if (req.url == '/') {
        router.showIndex(req, res);
    } else if (req.url.substr(0,5) == '/stu/'){
        router.showStu(req, res);
    } else {
        router.show404(req, res);
    }

});

// 运行服务器
server.listen(3000, '127.0.0.1');





