
var express = require('express');
var app = express();

// 路由重名
// 路由中间件
app.get('/kk',function(req,res,next){
    console.log(1);
    next();
});

app.get('/kk',function(req,res){
    console.log(2);
    res.send('响应完成');
});


// 匹配冲突
app.get('/:goods/:num',function(req, res, next){
    // 做查询/匹配...
    if (false) {
        console.log(1);
        res.send('商品' + req.params.goods + '数量:'+req.params.num);
    } else {
        next();
    }
});

app.get('/admin/login',function(req,res){
    console.log(2);
    res.send('登录界面');
});



app.listen(3000);


