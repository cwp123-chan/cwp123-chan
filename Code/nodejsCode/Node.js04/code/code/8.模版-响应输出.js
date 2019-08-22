
var express = require('express');
var app = express();

// 指定框架的模版引擎,无需导入
app.set('view engine', 'ejs');

// 提供静态资源服务
// app.use(express.static('./static'));

// 默认使用 .ejs 为模版文件,目录views
// app.set('views', './pages');

app.get('/', function (req,res){
    // 绑定数据并渲染视图
    res.render('user', {
        'userlist' : [
            '钢铁侠 屎大颗',
            '绿巨人 浩克',
            '美队 史蒂文',
            '雷神 托尔',
            '邪神 洛基',
            '蜘蛛侠 彼得帕克'
        ]
    });
});

app.get('/hh', function (req,res){
    // node.js end()
    // express send()
    // 二进制
    // res.send(new Buffer('HOOH~'));

    // str
    // res.send('HOOH~');

    // JSON
    // res.send({name:"静静", sec:0});
    // ARRAY
    res.send([15,168,19681,9681,98,986884,true]);
    
});

app.listen(3000);



