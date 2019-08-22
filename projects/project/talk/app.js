var net = require('net');
var server = net.createServer();
var host = '192.168.28.71';
var port = '8080';
server.listen(port,host);


server.on('connection',function(socket){
	console.log('服务器连接成功');

	socket.on('data',function(data){
		var data = data.toString();
		console.log(data);
	})


})