
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res) {
    // res.end('主页');
    if (req.url == '/') {
        fs.readFile('./index.html', function(err ,data){
            res.end(data);
        });
    }
});

var io = require('socket.io')(server);
// http://127.0.0.1:3000/socket.io/socket.io.js
// io 监听 收
io.on('connection',  function(socket){
    // console.log('有一个客户端连接');
    // 接收浏览器发来的数据
    socket.on('tiwen',function (msg){
        console.log(msg);
        // socket.emit('huida','你猜!');
        // 广播
        io.emit('huida','18岁!!!!');
    });
});




// 页面监听
server.listen(3000, '127.0.0.1');





