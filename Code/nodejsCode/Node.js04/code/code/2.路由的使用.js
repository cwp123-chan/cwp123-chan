//  引入express 框架
var express = require('express');
// 创建 express 的 HTTP服务器
var app = express();

// 支持所有的请求方式, 实现中间件的功能
app.all('/t', function(req, res, next){
    console.log(new Date().toString());
    next();
});


// 设置路由规则
app.get('/', function(req, res){
    // 响应输出
    res.send('Hello Express~~~');
});
// GET
app.get('/t', function(req, res){
    // 响应输出
    res.send('GET 请求');
});
// POST
app.post('/t', function(req, res){
    // 响应输出
    res.send('POST 请求');
});

// DELETE
app.delete('/t', function(req, res){
    // 响应输出
    res.send('DELETE 请求');
});


// 路由方法默认匹配 pathnameb部分,忽略get参数
// 对大小写不敏感
app.get('/aaa', function(req,res){
    console.log(req.query);
    res.send('3A页面 ');
});

// 路由路径 默认express path-to-regexp 匹配路由路径

// 正则路由   /stu/1234567890/tom
app.get(/^\/stu\/(\d{10})\/(\w+)$/, function(req,res){
    console.log(req.params);
    res.send('学员的学号是: '+ req.params[0]);
});

// 路由参数
// :xx 表示参数占位,使用req.params读取参数
app.get('/tch/:tid', function(req,res){
    console.log(req.params);
    res.send('老师的工号是: '+req.params.tid);
});

// 多个路由参数
app.get('/goods/:name/:num', function(req,res){
    // 参数限制
    var name = req.params.name;
    var num = req.params.num;
    if (/\d+/.test(num)) {
        res.send('商品名: ' + name + ', 入库: ' + num + '件');
    } else {
        res.send('请填写正确的数量');
    }
});


// 设置请求监听
app.listen(3000);


