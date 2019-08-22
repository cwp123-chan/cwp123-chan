
var express = require('express');
var app = express();

var a = 100;

app.get('/',function(req,res){
    a++;
    res.send(a.toString());
});


app.get('/t',function(req,res){
    a++;
    res.send(a.toString());
});

app.listen(3000);


