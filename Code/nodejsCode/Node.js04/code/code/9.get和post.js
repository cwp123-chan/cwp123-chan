
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// 指定框架的模版引擎,无需导入
app.set('view engine', 'ejs');


// parse application/x-www-form-urlencoded
//  解析 post数据
app.use(bodyParser.urlencoded({ extended: false }));

//GET参数
app.get('/', function (req,res){
    console.log(req.query);
    res.send('GET 完成');
});

app.get('/form', function (req,res){
    res.render('form');
});


// POST
app.post('/', function (req,res){
    console.log(req.body);
    res.send('POST 完成');
});


app.listen(3000);



