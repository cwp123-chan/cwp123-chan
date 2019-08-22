
var express = require('express');
var fs = require('fs');
var app = express();

// app.use(xxoo);
// 提供静态资源服务
// app.use('/static', express.static('./static'));
app.use('/jingtai',express.static('./static'));


app.get('/admin', function (req,res){
    res.send('后台...');
});


// 404页面
app.use(function(req,res,next){
    res.status(404).send('404 Not Found');
});


app.listen(3000);

//第三方模块 处理use 页面
function xxoo(req,res, next){
    // res.send('XX and OO');
    var filePath = req.originalUrl;
    fs.readFile('./static/'+ filePath, function(err, data){
        if (err) {
            next();
        }
        res.end(data); // 存在即输出
    });
}


