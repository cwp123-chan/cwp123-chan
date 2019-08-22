
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var hostname = '127.0.0.1';
var port = 3000;

// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    // 得到用户的路径
    var pathname = url.parse(req.url).pathname;
    // console.log(pathname);
    // 没有指定访问的文件,则默认访问 index
    if (pathname.indexOf('.') == -1) {
        pathname += 'index.html';
    }

    //  读取访问的文件
    fs.readFile('./static/'+pathname, function(err, data){
        if (err) {
            // 如果文件不存在,就必须显示404
            fs.readFile('./static/404.html', function (err, data){
                res.writeHead(404, {'content-type': 'text/html;charset=utf-8'});
                res.end(data);
            });
            return; // 停止运行输出
        }

        // 因为文件的MIME类型(扩展名)不同,所以头信息的设置 要动态设置才可以
        // 获取到 实际访问文件的 后缀, 要根据这个后缀,得到对应的MIME类型
        // .html  => text/html  | .png  =>  image/png  | .css
        
        // 响应得到文件的后缀,就需要使用 path 模块
        var extname = path.extname(pathname);
        // console.log(extname);

        /*var mime = getMime(extname);
        res.writeHead(200, {'content-type': mime});
        res.end(data);*/

       /* // 异步执行
        getMime(extname, function (mime){
            res.writeHead(200, {'content-type': mime});
            res.end(data);
        });*/

        // 使用nodejs提供的同步接口实现读取mime 文件
        var mimedata = fs.readFileSync('./mime.json');
        var mime = JSON.parse(mimedata);
        res.writeHead(200, {'content-type': mime[extname]});
        res.end(data);
    });
});

// 运行服务器
server.listen(port, hostname);

/*// 传入后缀,返回对应的MIME类型
function getMime(extname, callback){
    // 读取mime.json文件,用作于后缀与mime类型的匹配
    fs.readFile('./mime.json', function (err, data){
        // console.log(data);
        var mimeJSON = JSON.parse(data);
        // console.log(mimeJSON);
        // console.log(mimeJSON[extname]); //  输出mime类型
        // return mimeJSON[extname];
        callback(mimeJSON[extname]);
    });
}*/

/*// 传入后缀,返回对应的MIME类型
function getMime(extname){
    // 读取mime.json文件,用作于后缀与mime类型的匹配
    fs.readFile('./mime.json', function (err, data){
        // console.log(data);
        var mimeJSON = JSON.parse(data);
        // console.log(mimeJSON);
        // console.log(mimeJSON[extname]); //  输出mime类型
        return mimeJSON[extname];
    });
}*/

/*// 传入后缀,返回对应的MIME类型
function getMime(extname){
    switch (extname) {
        case '.html': return 'text/html'; break;
        case '.jpg': return 'image/jpg'; break;
        case '.png': return 'image/png'; break;
        case '.css': return 'text/css'; break;
        case '.js': return 'application/javascript'; break;
    }
}
*/