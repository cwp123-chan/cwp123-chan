
var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;


// 创建服务器
var server = http.createServer(function(req, res){
    // 跳过了 chrome 的收藏夹图标的请求
    if (req.url == '/favicon.ico') return;

    fs.readdir('./imgs', function(err, files){
        // 以数组的形式 返回该文件夹中的文件名
        // console.log(files);
        // [ '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','aaa',  'bbb' ]
        
        var wjj = []; // 存储文件夹名称
        for (var i = 0; i < files.length; i++) {
            var thisname = files[i];
            // 文件信息的检测
            fs.stat('./imgs/'+thisname, function(err, data){
                // 是否是文件夹,如果是则 追加到数组里
                if (data.isDirectory()) {
                    wjj.push(thisname);
                }
                // 循环过程输出一下
                console.log(wjj);
            });
            console.log('for循环已完成: '+wjj);
        }
        /*// 迭代器 : 异步 强变 同步
        (function iterator(i){
            if (i == files.length) {
                console.log('迭代器已完成: ' , wjj);
                return;
            }
            // console.log(files[i]);
            // files: [ '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','aaa',  'bbb' ]
            fs.stat('./imgs/'+files[i], function(err, stats){
                // 是否是文件夹,如果是则 追加到数组里
                if (stats.isDirectory()) {
                    wjj.push(files[i]);
                }
                // 进行迭代调用
                iterator(i+1);
            });
        })(0);*/

        // 使用 nodejs提供的同步接口 来实现同样的功能
        // for (var i = 0; i < files.length; i++) {
        //     var thisname = files[i];
        //     // 同步的读取文件状态信息接口
        //     var thisstat = fs.statSync('./imgs/'+ thisname);
        //     if (thisstat.isDirectory()) {
        //         wjj.push(thisname);
        //     }
        // }

        console.log(wjj);
    });
   
    res.end('读取完成');
});

// 运行服务器
server.listen(port, hostname);
