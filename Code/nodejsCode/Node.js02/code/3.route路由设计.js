
var http = require('http');
var url = require('url');

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;
    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});

    // /stu/20190212007  查询学员
    // /tch/00128        查询老师
    
    //  获取URL中的path部分
    var user = url.parse(req.url).pathname;

    // substr
    if (user.substr(0, 5) == '/stu/') {
        var stuid = user.substr(5);
        // console.log(stuid);
        if (/^\d{11}$/.test(stuid)) {
            res.end('查询到的学号是: ' + stuid);
        } else {
            res.end('学员的学号有误!!!');
        }
    } else if (user.substr(0, 5) == '/tch/') {
        var tchid = user.substr(5);
        // console.log(tchid);
        if (/^\d{5}$/.test(tchid)) {
            res.end('查询到的工号是: ' + tchid);
        } else {
            res.end('工号有误!!!');
        }
    } else {
        res.end('URL有误,请检查重试!!!');
    }
});

// 运行服务器
server.listen(port, hostname);

