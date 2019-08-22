
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req,res){
    if (req.url == '/form') {
        // 读取表单加载页面
        fs.readFile('./form.html', function(err, data){
            res.writeHead(200, {'content-type': 'text/html;charset=UTF-8'});
            res.end(data);
        });
    } else if (req.url == '/dopost' && req.method.toLocaleLowerCase() == 'post') {
        // 如果访问/dopost,且请求类型是post
        // 进行POST数据处理
        var postData = '';
        // node为了实现极致的效率,所以把post分成多个小份去传递
        req.addListener('data', function (chunk){
            postData += chunk;
        });

        // 全部接收完毕
        req.addListener('end', function(){
            console.log(postData);

            // 将post字串转换为一个对象
            var dataObj = querystring.parse(postData);
            console.log(dataObj);
            console.log(dataObj.name);
            res.end('POST DATA Success!');
        });


    } else {
        res.end('404');
    }

});

server.listen(port, hostname);





