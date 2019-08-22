//  引入express 框架
var express = require('express');
// console.log(express);

// 创建 express 的 HTTP服务器
var app = express();
// 指定框架的模版引擎,无需导入
app.set('view engine', 'ejs');

// 指定静态化的目录
app.use('/static', express.static('./static'));


// 设置路由规则
app.get('/', function(req, res){
    // 响应输出
    res.send('Hello Express~~~');
});

app.get('/test', function(req, res){
    // 响应输出
    res.send('这是test页面');
});

app.get('/user', function(req, res){
    // 绑定并输入数据
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



// 设置请求监听
app.listen(3000);


