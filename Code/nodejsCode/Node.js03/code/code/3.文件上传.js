
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable'); // 处理表单数据
var timestamp = require('time-stamp'); // 时间
var path = require('path'); // 时间

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req,res){
    if (req.url == '/form') {
        // 读取表单加载页面
        fs.readFile('./form_file.html', function(err, data){
            res.writeHead(200, {'content-type': 'text/html;charset=UTF-8;'});
            res.end(data);
        });
    } else if (req.url == '/dopost' && req.method.toLocaleLowerCase() == 'post') {
        // 如果访问/dopost,且请求类型是post
        // formidable 处理 parse a file upload
        var form = new formidable.IncomingForm();

        // 设置上传目录
        form.uploadDir = "./uploads";
        // 该模块已经将 POST数据 和 文件数据 分离处理
        // 当代码执行到parse()方法的回调函数时,表单中的数据 就都已经处理好了
        form.parse(req, function(err, fields, files) {
            // console.log(fields);
            // console.log(files);
            // 处理上传文件的存储
            // 新文件名: 时间 + 随机数 + 后缀
            var t = timestamp('YYYYMMDDHHmmss');
            var ran = parseInt(Math.random()* 100000);
            var extname = path.extname(files.myfile.name);

            // 旧文件名
            var oldPath = './' + files.myfile.path;
            // 新文件名
            var newPath = './uploads/' + t + ran + extname;
            console.log(oldPath);
            console.log(newPath);

            // 实现改名
            fs.rename(oldPath, newPath, function (err){
                res.end('文件上传成功!!');
            });
        });
    } else {
        res.end('404');
    }

});

server.listen(port, hostname);





