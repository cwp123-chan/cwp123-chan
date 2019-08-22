var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var mysql = require('mysql');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
var url=require("url");
var talkuser = {};
var talkusers = [];

var users = {}
usersoc = {};
userList = [];



app.get('/$', function (req, res) {
    var arry = new Array();
    var urls = req.url;
       param = url.parse(req.url,true).query;
       user = param.a;
       userfrn = param.b;
       mark = param.mark;
       roomnubs = param.room;
       rosmark = param.romark;
       roomsadmin = param.admin;
   // 进入聊天室
   if (rosmark) {
        console.log( roomsadmin+'进入了'+rosmark+'房间');

        return false;
   }else if(roomnubs){      // 判断用户是否进入房间   
    console.log('用户进入房间');
   // 链接数据库
   var connection = mysql.createConnection({

                host: '127.0.0.1',       //主机
                user: 'root',            //MySQL认证用户名
                password: 'cwp199811',
                port: '3306',
                database: 'info'
        });
    //建立数据库连接
   connection.connect(function (err) {

        if (err) {

            console.log('[query] - :' + err);

            return;

              }
        });
   // 查询房间是否重复；
   var roomnubcf = ` '${roomnubs}'  `
   var cfsql = 'select roomname from rooms where roomname='+roomnubcf;

   connection.query(cfsql,function(err,data){
    if (data.length !== 0) {
        console.log('对不起房间名重复');
        return false;
    }else{
            // 添加房间
           var roomnub = ` '${roomnubs}'  `;
           var roomadmin = ` '${user}'  `;
           var rsql = 'insert into  rooms(rid,roomname,roonadmin,stat)values('+"1"+',' + roomnub + ',' + roomadmin + ','+"1"+')' ;
           connection.query(rsql,function(err,data){
            console.log('添加成功');
            
           });

         }

   });
                connection.end();
            // 为了阻止 群聊和大厅重复
                return false;
       
   }

   // 链接数据库
   var connection = mysql.createConnection({

                host: '127.0.0.1',       //主机
                user: 'root',            //MySQL认证用户名
                password: 'cwp199811',
                port: '3306',
                database: 'info'


            });

//群聊
app.get('/qunliao',function(req, res){
    res.render('talks',{});
});

//建立数据库连接
    connection.connect(function (err) {

        if (err) {

            console.log('[query] - :' + err);

            return;

        }
    });

        if(mark == 1){
        var fnam = ` '${user}'  `;
        // var fpwd = ` '${fields.pwd2}'   `;
        // var newpath = `'${newPath2} '`;
        // //创建sql语句
        var sql = "select * from user where name= " + fnam;
        console.log(sql)
         connection.query(sql, function (err, result) {
             // // // 查询好友列表 判断有无重复好友
             var cfuser = ` '${userfrn}'  `;
             // var ksql = 'select userfr.name from userfr,user where user.id=userfr.uid and user.name='+cfuser;
             var ksql = 'select name from userfr where name='+cfuser;
             // console.log(ksql);
              connection.query(ksql, function (err, results) {
                console.log(results);

                // 如果查询不到就是好友重复
                        if(results.length !== 0){
                            console.log('重复了')
                            return;
                        }else{
                            // 添加好友到数据库；
                            var str = '';
                            var uid = ` '${result[0].id}'  `;
                            var nickname = ` '${userfrn}'   `;

                            console.log(nickname);
                            var hsql = 'insert into userfr (uid,name)values(' + uid + ',' + nickname + ')' ;
                            if(userfrn!==undefined){
                                connection.query(hsql, function (err, result) {
                                console.log(result);


                                 // console.log(result)

                                  });
                            }

                        }
                });           

        });
    }
        //执行sql语句
        var selectuser = `'${user}'`;

        var ssql = 'select userfr.name from userfr,user where user.id=userfr.uid and user.name='+selectuser;
// 
        console.log(ssql);
        connection.query(ssql, function (err, result) {
                    console.log('好友名：'+result);   


                    var roomsql = "select roomname from rooms";
                    connection.query(roomsql, function (err, rese) {
                    console.log('数据库名：'+rese[0].roomname);                
                        // console.log(err);
                    console.log(roomsql);
                        res.render('index',{
                            'ip' : req.ip,
                            'name':user,
                            'list':result,
                            'opt':rese
                        })                        
                        
                    });
               

                  
            // }
                // console.log(result);
                 // console.log(result[0])

        });


        


    // console.log(user);
    // console.log(urls.substr(4));
    // 获取用户ip
  

    // res.render('index', {
    //     'ip' : req.ip,
    //     'name':user
    // });
});


// Socket.IO 全双工实时通讯广播
io.on('connection', function (socket) {

    //　群聊
socket.on('joinuser',function(jionuserMsg){
        if (jionuserMsg == '666') {
                talkuser[user] = socket.id;
                talkusers.push(user);
                console.log(talkusers);
                console.log(talkuser);
                      

         }
})  


// 接收外部传来的信息
    socket.on('news',function(name){
        socket.id = socket.id + name;
        // console.log("id为:" + user);
         usersoc[user] = socket.id;
         userList.push(user);

        console.log("在线人有:" + userList);
        // console.log('a'+user);
    	socket.emit('newsOut',user);
        socket.emit('online',userList);
        // io.emit('newsuser',user);
    });
  // 断开连接。。。。。。。
    socket.on('disconnect', function () { 
        console.log(usersoc)
        console.log('disconnect: ' + socket.id);
        //　断开连接　清除大厅ｕｓｅｒ
        deleted(userList,user);
        // 断开连接　清除群聊ｕｓｅｒ；
        deleted(talkusers,user);
        
     });
       

    socket.on('clientOut', function (clientMsg) {
        console.log("群发数据："+clientMsg);
        // 把接收到的信息 原样广播到客户端
        console.log('我是：' + clientMsg['nameusers']);
        console.log('我的数据是：' +clientMsg['msg'] );
        if(clientMsg['msg'].split(':')[0] == '@'){
            console.log('进入私聊模式')
            var friend = clientMsg['msg'].split(':')[1];
            var massage = clientMsg['msg'].split(':')[2];
            if (usersoc[friend]) {
            io.to(usersoc[friend]).emit('serverOut',clientMsg);

        }else{

            io.to(usersoc[clientMsg['nameusers']]).emit('serverOut',"404");

            // console.log(friend);
        }
          
        }else{
            io.emit('serverOut', clientMsg);

        }

    });

  




    socket.on('disconnect',function(data){
        // console.log(socket.id);
        io.emit('outOut',socket.id.substr(20)+'离开了聊天室');
    });
});


    // 自定义删除数组某个值
    var deleted = function(val,arrname){
        for(var k=0;k<val.length;k++){
            if(val[k] == arrname){                
                 val.splice(k,1);
            }

        }
    }






http.listen(4000,"192.168.28.71");


