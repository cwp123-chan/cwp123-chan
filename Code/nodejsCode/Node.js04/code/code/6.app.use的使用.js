
var express = require('express');
var app = express();

// 全局中间件
app.use(function(req, res, next){
    console.log(new Date().toString());
    next();
});

// 中间件
app.use('/admin',function (req, res) {
    res.write(req.originalUrl + '\n'); // 完整的URL
    res.write(req.baseUrl + '\n');     // 基础URL
    res.write(req.path + '\n');        // 除去基础以外的URL
    res.end('后台...');
});

app.listen(3000);


