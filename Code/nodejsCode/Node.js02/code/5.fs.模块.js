
var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;


// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    /*// 新建文件夹
    fs.mkdir('./pics/aaa', function(err){
        console.log(err);
        res.end('文件夹创建成功');
    });*/

    /*// 删除文件夹,无法删除非空文件夹的
    fs.rmdir('./pics/aaa', function(err){
        console.log(err);
        res.end('文件夹删除成功');
    });*/

    /*// 文件状态信息
    fs.stat('./pics/aaa', function(err, stats){
        // console.log(stats);
        console.log(stats.isFile());
        console.log(stats.isDirectory());

        res.end('检测完成');
    });*/


    fs.readdir('./imgs', function(err, files){
        // 以数组的形式 返回该文件夹中的文件名
        console.log(files);
        res.end('读取完成');
    });
   
});

// 运行服务器
server.listen(port, hostname);
