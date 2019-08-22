var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('./views/index.ejs', function (err, data) {
            // 模版
            // console.log(data);
            var template = data.toString();
            // console.log(template);
            // 数据
            var dict = {
                title: 'EJS 模版的使用',
                content: '我是段落内容....',
                pic: './imgs/1.jpg',
                songci : {
                    title: '酒调歌头',
                    list : [
                        '明月几时有',
                        '白酒对瓶吹',
                        '不知喝到几点',
                        '今晚在哪睡?'
                    ]
                }
            }
            // 绑定数据
            var html = ejs.render(template, dict);

            // 显示输出页面
            res.writeHead(200, {'content-type':'text/html'});
            res.end(html);
        });
    } else if (req.url == '/imgs/1.jpg') {
        fs.readFile('./imgs/1.jpg', function (err, data) {
            res.writeHead(200, {'content-type':'image/jpg'});
            res.end(data);
        });
    }
});

server.listen(port, hostname);
